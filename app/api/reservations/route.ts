import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// user create reservation
export async function POST(request: Request) {
  // add check to ensure user session
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate } = body;

  if (!listingId || !startDate || !endDate) {
    return NextResponse.error();
  }

  const query: any = {};
  query.id = listingId;
  query.NOT = {
    reservations: {
      some: {
        OR: [
          {
            endDate: { gte: startDate },
            startDate: { lte: startDate },
          },
          {
            startDate: { lte: endDate },
            endDate: { gte: endDate },
          },
        ],
      },
    },
  };

  // $transaction calls operations in order and rolls back if any operation fails (db transaction)
  const listingAndReservation = await prisma.$transaction([
    prisma.listing.findFirstOrThrow({
      where: query,
    }),
    prisma.reservation.create({
      data: {
        userId: currentUser.id,
        startDate,
        endDate,
        listingId,
      },
    }),
  ]);

  return NextResponse.json(listingAndReservation);
}
