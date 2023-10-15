import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

// host delete listing
export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  // ensure valid host session
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}

export async function PATCH(
  request: Request, 
  { params }: { params: IParams }
) {

  const body = await request.json();
  const { available } = body
  // ensure valid host session
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.updateMany({
    where: {
      userId: currentUser.id,
      id: listingId,
    },
    data: {
      available: available,
    }
  });

  return NextResponse.json(listing);
}

