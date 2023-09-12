import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUserFavorite {
    listingId: number;
    currentUser?: SafeUser | null
}

const useFavorite = ({
    listingId,
    currentUser
}: IUserFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds?.split(",");
        return list?.includes(listingId.toString())
    }, [currentUser, listingId]);

    const toggleFavourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) return loginModal.onOpen();

        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch (err) {
            toast.error('Something went wrong');
        }
    }, [currentUser, listingId, hasFavorited, loginModal, router])

    return {
        hasFavorited,
        toggleFavourite
    }
}

export default useFavorite;