import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: number;
    authorId?: number
}


export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;
        const query: any = {};

        let listingIdVal: number = parseInt(listingId!);

        if (listingIdVal) {
            query.listingId = listingIdVal
        }

        if (userId) {
            query.userId = userId
        }

        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),
                },
            }));

        return safeReservations;
    } catch (err: any) {
        throw new Error(err);
    }
}