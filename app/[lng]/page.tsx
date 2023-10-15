import { redirect  } from "next/navigation";

import Container from "@/app/[lng]/components/Container";
import ListingCard from "@/app/[lng]/components/listings/ListingCard";
import EmptyState from "@/app/[lng]/components/EmptyState";
import HomeBanner from "@/app/[lng]/components/HomeBanner";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import { useTranslation } from "../i18n";
import Categories from "./components/navbar/Categories";

interface HomeProps {
  searchParams: IListingsParams;
  params: {
    lng: string;
  };
}

const Home = async ({ searchParams, params: { lng } }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset lng={lng} />
      </ClientOnly>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ClientOnly>
        <Categories lng={lng} />
        <hr />
        <HomeBanner isLoggedIn={!!currentUser} isHost={currentUser?.isHost} name={currentUser?.name || ''} lng={lng}/>
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
          pt-2"
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
      </ClientOnly>
    </div>
  );
};

export default Home;
