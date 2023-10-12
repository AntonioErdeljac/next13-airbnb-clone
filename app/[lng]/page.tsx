import Container from "@/app/[lng]/components/Container";
import ListingCard from "@/app/[lng]/components/listings/ListingCard";
import EmptyState from "@/app/[lng]/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import { useTranslation } from "../i18n";

interface HomeProps {
  searchParams: IListingsParams;
  params: {
    lng: string;
  };
}

const Home = async ({ searchParams, params: { lng } }: HomeProps) => {
  const { t } = await useTranslation(lng)
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
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
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              lng={lng}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
