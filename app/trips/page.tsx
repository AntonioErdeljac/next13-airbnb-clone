import EmptyState from "../components/EmptyState";
// import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            // <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login" />
            // </ClientOnly>
        )
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (
            // <ClientOnly>
            <EmptyState title="No Trips Found" subtitle="Looks like you haven't reserved any trips" />
            // </ClientOnly>
        )
    }

    return (
        // <ClientOnly>
        // <TripsClient currentUser={currentUser} />
        <TripsClient reservations={reservations} currentUser={currentUser} />
        // </ClientOnly>
    )


}

export default TripsPage;