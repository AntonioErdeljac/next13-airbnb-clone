'use client';


import useBureaus from "@/app/hooks/useBureaus";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue}) => {
  const { getByValue } = useBureaus();

  const location = getByValue(locationValue);

  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
    </>
   );
}
 
export default ListingHead;