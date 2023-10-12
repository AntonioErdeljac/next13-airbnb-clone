import Container from "@/app/[lng]/components/Container";
import ListingCard from "@/app/[lng]/components/listings/ListingCard";
import EmptyState from "@/app/[lng]/components/EmptyState";
import Banner from "@/app/[lng]/components/Banner";

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
  const { t } = await useTranslation(lng);
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset lng={lng} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div style={{ marginTop: "150px" }}></div>
        <Banner
          title="Adding a listing"
          text="Explain why hosts should not provide any specific details about their listing 
from a security perspective (e.g. address) - 
during the description section of adding a listing"
        />
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
