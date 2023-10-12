import EmptyState from "@/app/[lng]/components/EmptyState";
import ClientOnly from "@/app/[lng]/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

interface Params {
  lng: string;
}

const PropertiesPage = async ({ params }: { params: Params }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" lng={params.lng} />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="לא נמצאו מודעות"
          subtitle="נראה שעדיין לא פרסמת מודעה."
          lng={params.lng}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} lng={params.lng} />
    </ClientOnly>
  );
};

export default PropertiesPage;
