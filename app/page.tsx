import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams
}

export const dynamic = 'force-dynamic'

// export default async function Home() {
const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  // const isEmpty = true;
  const currentUser = await getCurrentUser();

  // if (isEmpty) {
  if (listings.length === 0) {
    return (
      // <ClientOnly>
      <EmptyState showReset />
      // </ClientOnly>
    )
  }

  // throw new Error("Something went wrong!");

  return (
    // <div className="text-rose-500 text-2xl">Hello Air! </div>
    // <ClientOnly>
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {/* <div>My future listings</div> */}
        {/* {listings.map((listing: any) => { */}
        {listings.map((listing) => {
          return (
            // <div>{listing.title}</div>
            <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
          )
        })}
      </div>
    </Container>
    // </ClientOnly>
  )
}

export default Home;