import { Listing, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
const reservationWithUser = Prisma.validator<Prisma.ReservationArgs>()({
  include: {
    user: {
      select: {
        name: true,
        email: true
      }
    }
  }
});

type ReservationWithUser = Prisma.ReservationGetPayload<typeof reservationWithUser>
 
export type SafeReservation = Omit<
  ReservationWithUser, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
  user?: {
    name: string | null;
    email: string | null;
  };
};


export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
} & {
  isHost?: boolean;
};
