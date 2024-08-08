import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./mongodb";
import Teacher from "./mongodb/models/Teacher";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        teacherId: {},
      },
      async authorize(credentials, req) {
        try {
          await dbConnect();

          const foundTeacher = await Teacher.findOne({
            username: credentials?.username,
            teacherId: credentials?.teacherId,
          });

          if (foundTeacher) return foundTeacher;

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...(token.user as any),
          id: token.sub,
        },
      };
    },
    jwt({ token, user }) {
      if (!!user) token.user = user;
      return token;
    },
  },
};
