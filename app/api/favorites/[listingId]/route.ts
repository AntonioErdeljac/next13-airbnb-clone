import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    if (!listingId) {
        // if (!listingId || typeof listingId !== 'number') {
        throw new Error("Invalid ID")
    }

    // let favoutiteIDs = [...(currentUser.favoriteIds || [])];
    let favoutiteIDs = currentUser.favoriteIds?.split(",") || [];
    favoutiteIDs?.push(listingId);
    const filtered = favoutiteIDs.filter(Boolean);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: filtered?.toString()
        }
    });

    return NextResponse.json(user);

}


export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    // if (!listingId || typeof listingId !== 'number') {
    if (!listingId) {
        throw new Error("Invalid ID")
    }

    let favoutiteIDs = currentUser.favoriteIds?.split(",") || [];
    favoutiteIDs = favoutiteIDs?.filter((id) => parseInt(id) != parseInt(listingId));
    const filtered = favoutiteIDs.filter(Boolean);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: filtered?.toString()
        }
    });

    return NextResponse.json(user);
}