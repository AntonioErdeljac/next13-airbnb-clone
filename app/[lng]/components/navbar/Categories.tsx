'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbMoodKid, TbAccessible, TbJewishStar, TbDog, TbSmokingNo, TbParking } from 'react-icons/tb';
import { FaPersonShelter } from "react-icons/fa6";
import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const allCategories = [
  {
    label: 'accessible',
    icon: TbAccessible,
    description: 'accessibleProperty',
  },
  {
    label: 'children',
    icon: TbMoodKid,
    description: 'childrenFriendly',
  },
  {
    label: 'kosher',
    icon: TbJewishStar,
    description: 'kosherKeeping'
  },
  {
    label: 'pets',
    icon: TbDog,
    description: 'petsFriendly'
  },
  {
    label: 'noSmoking',
    icon: TbSmokingNo,
    description: 'noSmoking'
  },
  {
    label: 'parking',
    icon: TbParking,
    description: 'parkingAvailable'
  },
  {
    label: 'shelter',
    icon: FaPersonShelter,
    description: 'indoorShelter'
  },
]

const Categories = ({ lng }: { lng: string }) => {
  const params = useSearchParams();
  const categories = params?.getAll('categories');
  const pathname = usePathname();
  const isMainPage = pathname === `/${lng}`;

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-center
          overflow-x-auto
        "
      >
        {allCategories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={categories?.includes(item.label)}
            lng={lng}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;