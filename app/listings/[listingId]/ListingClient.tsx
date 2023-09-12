'use client';

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
// import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

export function RefreshPage() {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [router]);
    return null;
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    // reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    }

    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, reservations = [], currentUser }) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category]);

    const [disabledDates, setDisabledDates] = useState<Date[]>([]);

    const loginModal = useLoginModal();
    const router = useRouter();
    // const disabledDates = useMemo(() => {
    //     let dates: Date[] = [];

    //     reservations.forEach((reservation) => {
    //         const range = eachDayOfInterval({
    //             start: new Date(reservation.startDate),
    //             end: new Date(reservation.endDate)
    //         });

    //         dates = [...dates, ...range];
    //     });

    //     return dates;
    // }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) return loginModal.onOpen();

        setIsLoading(true);

        // let startDate: Date = new Date(`${dateRange.startDate?.getFullYear()}-${dateRange.startDate?.getMonth()}-${dateRange.startDate?.getDate()}`);
        // let endDate: Date = new Date(`${dateRange.endDate?.getFullYear()}-${dateRange.endDate?.getMonth()}-${dateRange.endDate?.getDate()}`);

        axios.post('/api/reservations', {
            totalPrice,
            // startDate: startDate,
            startDate: dateRange.startDate,
            // endDate: endDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success("Listing Reserved");
            setDateRange(initialDateRange);

            //redirect to /trips
            // router.refresh();
            router.push("/trips");
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
        }).finally(() => {
            setIsLoading(false);
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

    let fetchReservedDates = useCallback(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            if (reservation.listingId === listing.id) {
                const range = eachDayOfInterval({
                    start: new Date(reservation.startDate),
                    end: new Date(reservation.endDate)
                });

                dates = [...dates, ...range];
            }
        });

        // return dates;
        setDisabledDates(dates);
    }, [reservations, setDisabledDates, listing.id])

    useEffect(() => {
        fetchReservedDates();

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [fetchReservedDates, dateRange, listing.price])

    return (
        <Container>
            <RefreshPage />
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
                        <div className="order-first mb-10 mb:order-last md:col-span-3">
                            <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;