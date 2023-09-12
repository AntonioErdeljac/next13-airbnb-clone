import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            // <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login" />
            // </ClientOnly>
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length === 0) {
        return (
            // <ClientOnly>
            <EmptyState title="No Reservations Found" subtitle="Looks like you have no reservations on your properties" />
            // </ClientOnly>
        )
    }

    return (
        // <ClientOnly>
        // <TripsClient currentUser={currentUser} />
        <ReservationsClient reservations={reservations} currentUser={currentUser} />
        // </ClientOnly>
    )


}

export default ReservationsPage;