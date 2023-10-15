import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";
import { getAuthorizedHosts } from "@/app/api/utils/gsheet";
import { userAgent } from "next/server";

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
    /**
       * @param  {object}  token     Decrypted JSON Web Token
       * @param  {object}  user      User object      (only available on sign in)
       * @param  {object}  account   Provider account (only available on sign in)
       * @param  {object}  profile   Provider profile (only available on sign in)
       * @param  {boolean} isNewUser True if new user (only available on sign in)
       * @return {object}            JSON Web Token that will be saved
       */
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      // Only update the sesion user if we have fetched it from the DB
      if (user) {
        token.name = user?.name || profile?.name;
        // @ts-expect-error
        token.picture = profile?.image || profile?.picture || user?.image;
        // @ts-expect-error
        token.isHost = user.isHost;
        token.id = user.id;
        if (!token.isHost) {
          const uniqueHosts = await getAuthorizedHosts();
          if (uniqueHosts.has(token.email)) {
            token.isHost = true;
          }  
        }
      }
      return token
    },    
    session: async (params) => {
      return {
        ...params.session,
        user: {
          ...params.session.user,
          image: params.token.picture,
          id: params.token.id,
          isHost: params.token.isHost,
        }
      };
    },
  },
};

export default NextAuth(authOptions);
