'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbMoodKid, TbAccessible, TbJewishStar, TbDog, TbSmokingNo, TbParking } from 'react-icons/tb';
import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const allCategories = [
  {
    label: 'נגיש/Accessible',
    icon: TbAccessible,
    description: 'מקום נגיש/Accessible property',
  },
  {
    label: 'ילדים/Children',
    icon: TbMoodKid,
    description: 'מקום ידידותי לילדים/Children friendly',
  },
  {
    label: 'כשר/Kosher',
    icon: TbJewishStar,
    description: 'מקום שומר כשרות/Kosher'
  },
  {
    label: 'בעלי חיים/Pets',
    icon: TbDog,
    description: 'מותר בעלי חיים/Pets friendly'
  },
  {
    label: 'ללא עישון/No smoking',
    icon: TbSmokingNo,
    description: 'האישון אסור/No smoking'
  },
  {
    label: 'חניה/Parking',
    icon: TbParking,
    description: 'יש חניה/Parking available'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const categories = params?.getAll('categories');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

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
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;