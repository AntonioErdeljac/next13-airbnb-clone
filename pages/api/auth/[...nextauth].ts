import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";
import { getAuthorizedHosts } from "@/app/api/utils/gsheet";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async (params) => {
      const email = params.session.user?.email;
      const uniqueHosts = await getAuthorizedHosts();
      if (uniqueHosts.has(email)) {
        if (!params.session.user) {
          params.session.user = params.user;
        }
        // @ts-expect-error
        params.session.user.isHost = true;
      }
      return params.session;
    },
  },
};

export default NextAuth(authOptions);
