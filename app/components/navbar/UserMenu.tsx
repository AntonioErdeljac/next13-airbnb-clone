"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  // Hide listing creation button from non-hosts (for fixed width rendering). Actual authorization is checked in api.
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
         <div
          onClick={onRent}
          className={`
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
            ${currentUser?.isHost ? 'visible' : 'invisible' }
          `}
        >
          רוצה לארח
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            left-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="מקומות בהם התארחתי/אתארח"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="בקשות אירוח אצלי"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="המקומות שלי"
                  onClick={() => router.push("/properties")}
                />
                { currentUser?.isHost && <MenuItem label="רוצה לארח" onClick={rentModal.onOpen} /> }
                <hr />
                <MenuItem label="התנתקות" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="כניסה" onClick={loginModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
