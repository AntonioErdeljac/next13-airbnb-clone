'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from "../CategoryBox";
import Container from '../Container';

import { ICategory } from '../types';
import Image from 'next/image';


const mkIconElement = (name: string) => {
  return (
    <Image className="hidden md:block cursor-pointer"
    src={`/icons/${name}.svg`}
    height="24"
    width="24"
    alt=""
    />
  )};

 export const allCategories: ICategory[] = [
  {
    icon: mkIconElement('accessibility'),
    label: 'accessible',
    description: 'accessibleProperty',
  },
  {
    icon: mkIconElement('kids'),
    label: 'children',
    description: 'childrenFriendly',
  },
  {
    icon: mkIconElement('kosher'),
    label: 'kosher',
    description: 'kosherKeeping'
  },
  {
    icon: mkIconElement('pets'),
    label: 'pets',
    description: 'petsFriendly'
  },
  {
    icon: mkIconElement('noSmoking'),
    label: 'noSmoking',
    description: 'noSmoking'
  },
  {
    icon: mkIconElement('parking'),
    label: 'parking',
    description: 'parkingAvailable'
  },
  {
    icon: mkIconElement('shelter'),
    label: 'shelter',
    description: 'indoorShelter',
  },
  {
    icon: mkIconElement('shelter-near-by'),
    label: 'nearbyShelter',
    description: 'nearbyShelterDesc',
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