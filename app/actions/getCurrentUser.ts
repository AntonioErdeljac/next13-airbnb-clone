import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { Session } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

interface SessionUser {
  id: string;
  name: string | null;
  email: string | null;
  image?: string | null;
  isHost?: boolean;
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    // NOTICE: We are using the session user as our user and not fetching every time from the DB
    const user = session?.user as SessionUser;
    if (!user?.email || !user?.id) {
      return null;
    }

    return user;
  } catch (error: any) {
    return null;
  }
}
