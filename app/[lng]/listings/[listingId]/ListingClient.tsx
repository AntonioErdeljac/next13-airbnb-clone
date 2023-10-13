"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/[lng]/components/Container";
import { allCategories } from "@/app/[lng]/components/navbar/Categories";
import ListingHead from "@/app/[lng]/components/listings/ListingHead";
import ListingInfo from "@/app/[lng]/components/listings/ListingInfo";
import ListingReservation from "@/app/[lng]/components/listings/ListingReservation";

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
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
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
        router.push("/trips");
      })
      .catch(() => {
        toast.error("משהו השתבש.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dateRange, listing?.id, router, currentUser, loginModal]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
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
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
              {!currentUser?.isHost && (
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
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              על מנת להגן על פרטיותכם עליכם להתחבר באמצעות חשבון gmail תקין
              למערכת
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
