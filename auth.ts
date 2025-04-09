import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import config from "./lib/config";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: config.env.github.clientId!,
      clientSecret: config.env.github.clientSecret!,
    }),
    Google({
      clientId: config.env.google.clientId!,
      clientSecret: config.env.google.clientSecret!,
    }),
  ],
})