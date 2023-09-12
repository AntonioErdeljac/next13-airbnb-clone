'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: number,
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
    // const hasFavorited = false;
    // const toggleFavourite = () => { };
    const { hasFavorited, toggleFavourite } = useFavorite({ listingId, currentUser });

    return (
        <div onClick={toggleFavourite} className="relative hover:opacity-80 transition cursour-pointer">
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
            <AiFillHeart size={24} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </div>
    );
}

export default HeartButton;