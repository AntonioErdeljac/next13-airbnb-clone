"use client";

import { useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { useTranslation } from "@/app/i18n/client";
import useBecomeHostModal from "@/app/hooks/useBecomeHostModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  lng: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, lng }) => {
  const { t } = useTranslation(lng);
  const router = useRouter();

  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const becomeHostModal = useBecomeHostModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  const ref = useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const onRegisterHost = useCallback(() => {
    if (!currentUser) {
      return becomeHostModal.onOpen();
    }

    becomeHostModal.onOpen();
  }, [loginModal, becomeHostModal, currentUser]);
  if (!currentUser) {
    //<MenuItem label={t('login')} onClick={loginModal.onOpen} />
    return (
      <button
        onClick={loginModal.onOpen}
        className={`
        md:block
        text-sm 
        font-semibold 
        p-1
        rounded-md 
        hover:bg-slate-100 
        transition 
        cursor-pointer
        border-slate-400
        border-[1px]
        `}
      >
        {t("login")}
      </button>
    );
  }

  // Hide listing creation button from non-hosts (for fixed width rendering). Actual authorization is checked in api.
  return (
    <div className="relative">
      <div className="md:flex flex-row items-center md:gap-3">
        <div className="hidden lg:block">
          <button
            onClick={onRent}
            className={`
          font-base 
          py-2 
          rounded
          bg-sky-500
          text-white
          hover:opacity-80
          transition 
          cursor-pointer
          border-slate-400
          border-[1px]
          w-40
        ${currentUser?.isHost ? "visible" : "invisible"}
          `}
          >
            {t("wishToHost")}
          </button>
        </div>
        <div
          onClick={onRegisterHost}
          className={`
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-slate-100 
            transition 
            cursor-pointer
            ${!currentUser?.isHost ? "visible" : "invisible"}
          `}
        >
          {t("signupHost")}
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-2
          sm:p-4
          md:py-1
          md:px-2
          flex 
          flex-row 
          items-center 
          gap-3 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu className="sm:h-4 sm:w-4" />
          <div
            className="hidden sm:block"
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="
            absolute 
            rounded 
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
                <MenuItem label={currentUser!.name || ""} />
                <hr />
                <MenuItem
                  label={t("myListings")}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/${lng}/properties`);
                  }}
                />
                {currentUser?.isHost ? (
                  <MenuItem
                    label={t("wishToHost")}
                    onClick={rentModal.onOpen}
                  />
                ) : (
                  <MenuItem
                    label={t("signupHost")}
                    onClick={rentModal.onOpen}
                  />
                )}
                <hr />
                <MenuItem label={t("disconnect")} onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label={t("login")} onClick={loginModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
