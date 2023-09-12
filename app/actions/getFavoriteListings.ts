import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return [];

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    // in: [...(currentUser.favoriteIds || [])].map(Number)
                    in: Array.from(currentUser.favoriteIds || []).map(Number)
                }
            }
        });

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));

        return safeFavorites;

    } catch (err: any) {
        throw new Error(err);
    }
}