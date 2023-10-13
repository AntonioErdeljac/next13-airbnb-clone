import prisma from "@/app/libs/prismadb";
import pick from "lodash.pick";
import { Listing } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  categories?: string[];
  phoneNumber?: string;
}

const publicKeys: Array<keyof Listing> = [
  "title",
  "roomCount",
  "guestCount",
  "locationValue",
  "categories",
  "id",
];

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      categories,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (categories) {
      query.categories = {
        hasEvery: categories
      }
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
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
    }

    const listings = (await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    })) as Array<Listing>;

    const hasSession = !!(await getCurrentUser());

    const safeListings = listings.map((listing) =>
      hasSession
        ? {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
          }
        : {
            ...pick(listing, publicKeys),
            createdAt: listing.createdAt.toISOString(),
          }
    );

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
