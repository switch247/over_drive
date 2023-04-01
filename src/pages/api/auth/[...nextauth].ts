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
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
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
          return { id: user.id, email: user.email };
        }
        return null;
      },

    }),

  ],

};



export default NextAuth(authOptions);

