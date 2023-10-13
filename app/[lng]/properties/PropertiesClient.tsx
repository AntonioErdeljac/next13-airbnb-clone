"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";
import { useTranslation } from '@/app/i18n/client';
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import Heading from "@/app/[lng]/components/Heading";
import Container from "@/app/[lng]/components/Container";
import ListingCard from "@/app/[lng]/components/listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
  lng: string;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
  lng,
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const { t } = useTranslation(lng);
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);


  return (
    <Container>
      <div className="mt-3 max-w-fit mb-8">
        <button
          onClick={onRent}
          className={`
            relative
            px-2
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            bg-sky-500
            border-sky-500
            text-white
            text-sm
            py-1
            font-light
            border-[1px]
            ${currentUser?.isHost ? "visible" : "invisible"}
          `}
        >
          {t('wishToHost')}
        </button>
      </div>
      <Heading title={t('propertiesTitle')} subtitle={t('propertiesSubtitle')} />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel={t('removePropertyLabel')}
            currentUser={currentUser}
            lng={lng}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
