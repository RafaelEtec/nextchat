import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import config from "./lib/config";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import axios from "axios";
import { imagekit } from "@/lib/imagekit";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientId: config.env.github.clientId!,
      clientSecret: config.env.github.clientSecret!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Google({
      clientId: config.env.google.clientId!,
      clientSecret: config.env.google.clientSecret!,
      authorization: {
        params: {
          prompt: "consent",
        }
      }
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email!));

        if (existingUser.length > 0) {
          token.id = existingUser[0].id;
        }
      }
      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      } return session;
    },
    async signIn({user}) {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email!));

      if (existingUser.length === 0) {
        let uploadedImageUrl = user.image!;

        try {
          const response = await axios.get(user.image!, { responseType: "arraybuffer" });
          const imageBuffer = Buffer.from(response.data, "binary");

          const uploadResponse = await imagekit.upload({
            file: imageBuffer,
            fileName: `${user.name}-profile.jpg`,
            folder: "/profiles/",
          });

          uploadedImageUrl = uploadResponse.url;
        } catch (error) {
          console.error("Erro ao fazer upload da imagem no ImageKit:", error);
        }

        await db.insert(users).values({
          id: crypto.randomUUID(),
          name: user.name!,
          email: user.email!,
          image: uploadedImageUrl,
        });
      }

      return true;
    }
  },
})