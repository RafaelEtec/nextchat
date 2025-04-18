import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import config from "./lib/config";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

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
          prompt: "consent",
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
        await db.insert(users).values({
          id: crypto.randomUUID(),
          name: user.name!,
          email: user.email!,
          image: user.image!,
        });
      } return true;
    },
  },
})