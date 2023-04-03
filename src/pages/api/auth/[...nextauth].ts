import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider(<GoogleAuth>{
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// };

import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/auth"; // Utility function to verify password
import { db } from "@/server/db"; // Your database instance
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "process";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        ...token,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({

      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials!.email },
        });

        if (user && (await verifyPassword(credentials!.password, user.password ?? ""))) {
          return user;
        }
        return null;
      },

    }),

  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "test",
  debug: process.env.NODE_ENV === "development"
};



export default NextAuth(authOptions);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }

