import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return NextResponse.error();

        const body = await request.json();

        const { listingId, startDate, endDate, totalPrice } = body;

        if (!listingId || !startDate || !endDate || !totalPrice) {
            return NextResponse.error();
        }

        const listingAndReservation = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                reservations: {
                    create: {
                        userId: currentUser.id,
                        startDate,
                        endDate,
                        totalPrice
                    }
                }
            }
        });

        return NextResponse.json(listingAndReservation);
    } catch (err) {
        console.log(err);
    }
}

export async function GET() {
    try {
        const query: any = {};
        const currentUser = await getCurrentUser();
        if (!currentUser) return NextResponse.error();

        query.userId = currentUser.id;

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

        return NextResponse.json(safeReservations);
    } catch (err: any) {
        console.log(err);
    }
}