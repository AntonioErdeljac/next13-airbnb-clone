"use client";

import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { TbArrowBigLeftFilled } from "react-icons/tb";

import Container from "@/app/[lng]/components/Container";
import { allCategories } from "@/app/[lng]/components/navbar/Categories";
import ListingHead from "@/app/[lng]/components/listings/ListingHead";
import ListingInfo from "@/app/[lng]/components/listings/ListingInfo";
import ListingReservation from "@/app/[lng]/components/listings/ListingReservation";
import { useTranslation } from "@/app/i18n/client";
import Button from "../../components/Button";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  lng: string;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
  lng,
}) => {
  const { t } = useTranslation(lng);
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const categories = useMemo(() => {
    return allCategories.filter((items) =>
      listing.categories.includes(items.label)
    );
  }, [listing.categories]);

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("ההזמנה נקלטה!");
        setDateRange(initialDateRange);
        router.push(`${lng}/trips`);
      })
      .catch(() => {
        toast.error("משהו השתבש.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dateRange, listing?.id, router, currentUser, loginModal, lng]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="inline-flex">
          <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="g-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-l"
            onClick={() => router.back()}
          >
            <TbArrowBigLeftFilled
              fill="currentColor"
              className="mr-1 h-4 w-4"
              viewBox="0 0 24 24"
            />
            {t("getBack")}
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          {!!currentUser ? (
            <div
              className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
            >
              <ListingInfo
                user={listing.user}
                categories={categories}
                title={listing.title}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
                lng={lng}
                phoneNumber={listing.phoneNumber}
              />
              <div
                className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
              >
                <ListingReservation
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                  lng={lng}
                />
              </div>
            </div>
          ) : (
            <div>{t("unauthorized")}</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
