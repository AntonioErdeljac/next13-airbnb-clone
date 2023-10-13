import EmptyState from "@/app/[lng]/components/EmptyState";
import ClientOnly from "@/app/[lng]/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";
import HomeBanner from "../components/HomeBanner"

import { useTranslation } from "../../i18n";

interface Params {
  lng: string;
}

const PropertiesPage = async ({ params }: { params: Params }) => {
  const currentUser = await getCurrentUser();
  const { t } = await useTranslation(params.lng);

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" lng={params.lng} />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={t('propertiesEmptyTitle')}
          subtitle={t('propertiesEmptySubtitle')}
          lng={params.lng}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <HomeBanner isLoggedIn={!!currentUser} isHost={currentUser?.isHost} name={currentUser?.name || ''} lng={params.lng}/>
      <PropertiesClient listings={listings} currentUser={currentUser} lng={params.lng} />
    </ClientOnly>
  );
};

export default PropertiesPage;
