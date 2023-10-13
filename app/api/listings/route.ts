import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// host create listing
export async function POST(
  request: Request, 
) {
  // ensure valid host session
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse(null, { status: 401});
  }

  if (!currentUser.isHost) {
    return new NextResponse(null, { status: 403});
  }

  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    categories,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    phoneNumber
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return new NextResponse(null, { status: 400 });
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      categories,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      userId: currentUser.id,
      phoneNumber
    }
  });

  return NextResponse.json(listing);
}
