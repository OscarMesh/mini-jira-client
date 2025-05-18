import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { loggedUser, login } from "@/services/auth-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,

  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await login({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });

        const { user, token } = response.data;

        if (!user) {
          throw new Error("User not found.");
        }

        return {
          ...user,
          accessToken: token,
        };
      },
    }),
    CredentialsProvider({
      name: "tokenCredentials",
      id: "tokenCredentials",
      credentials: {
        token: {},
      },
      authorize: async (credentials) => {
        const response = await loggedUser(credentials?.token as string);

        const { data: user } = response.data;

        if (!user) {
          throw new Error("User not found.");
        }

        return {
          ...user,
          accessToken: credentials?.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        const loggedUser = user as any;
        token.userId = loggedUser.id;
        token.name = loggedUser.name;
        token.email = loggedUser.email;
        token.accessToken = loggedUser.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          userId: token.id,
          name: token.name,
          email: token.email,
          accessToken: token.accessToken,
        } as any;
      }

      return session;
    },
  },
});
