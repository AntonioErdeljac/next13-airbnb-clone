'use client';

import { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

export function RefreshPage() {
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [router]);
    return null;
}

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, currentUser }) => {
    // const PropertiesClient: React.FC<PropertiesClientProps> = ({ currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState(0);
    // const [reservations, setReservations] = useState<SafeReservation[]>([]);
    // const [isLoadingTrips, setIsLoadingTrips] = useState(true);

    /*
    const initReservations = useCallback(async () => {
        setIsLoadingTrips(true);
        await axios.get('/api/reservations').then((response) => {
            setReservations(response.data);
            setIsLoadingTrips(false);
        });

    }, [setReservations])

    useEffect(() => {
        initReservations();
    }, [])
    */

    const onCancel = useCallback((id: number) => {
        setDeletingId(0);
        axios.delete(`/api/listings/${id}`).then(() => {
            toast.success("Listing deleted");
            router.refresh();
            // initReservations();
        }).catch((err) => {
            toast.error(err?.response?.data.error);
        }).finally(() => {
            setDeletingId(0);
        })
    }, [router]);

    /*
    if (isLoadingTrips) {
        return (
            // <ClientOnly>
            <EmptyState title="Fetching Trips" subtitle="Please wait while we fetch your trips" />
            // </ClientOnly>
        )
    } else {

    if (reservations.length === 0) {
        return (
            // <ClientOnly>
            <EmptyState title="No Trips Found" subtitle="Looks like you haven't reserved any trips" />
            // </ClientOnly>
        )
    }
    */

    return (
        <Container>
            <RefreshPage />
            <Heading
                title="Properties"
                subtitle="List of your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete Property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );

    /*}*/
}

export default PropertiesClient;