import prisma from "@/app/libs/prismadb";
import { SafeListing, SafeUser } from "../types";


interface IParams {
    listingId?: string
}

export default async function getListingById(params: IParams) {
    try {
        const { listingId } = params;

        let listingIdVal: number = parseInt(listingId!);

        // console.log(`listingId is ${listingId} (${typeof listingId}) and listingIdVal is ${listingIdVal} (${typeof listingIdVal})`);

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingIdVal
            },
            include: {
                user: true
            }
        });

        // console.log(listingId, listing);

        if (!listing) return null;

        // return listing;

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.createdAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString()!,
            }
        }


    } catch (err: any) {
        throw new Error(err);
    }
}