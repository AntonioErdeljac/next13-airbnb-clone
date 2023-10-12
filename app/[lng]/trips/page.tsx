import EmptyState from "@/app/[lng]/components/EmptyState";
import ClientOnly from "@/app/[lng]/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./TripsClient";
import { useTranslation } from "@/app/i18n";

interface Params {
  lng: string;
}

const TripsPage = async ({ params }: { params: Params }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" lng={params.lng} />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="לא נמצאו הזמנות"
          subtitle="נראה שעדיין לא הזמנת אירוח."
          lng={params.lng}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
        lng={params.lng}
      />
    </ClientOnly>
  );
};

export default TripsPage;
