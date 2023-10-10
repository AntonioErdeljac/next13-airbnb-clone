'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbMoodKid, TbAccessible, TbJewishStar, TbDog, TbSmokingNo, TbParking } from 'react-icons/tb';
import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'נגיש',
    icon: TbAccessible,
    description: 'מקום נגיש',
  },
  {
    label: 'ילדים',
    icon: TbMoodKid,
    description: 'מקום ידידותי לילדים',
  },
  {
    label: 'כשר',
    icon: TbJewishStar,
    description: 'מקום שומר כשרות'
  },
  {
    label: 'בעלי חיים',
    icon: TbDog,
    description: 'מותר בעלי חיים'
  },
  {
    label: 'ללא עישון',
    icon: TbSmokingNo,
    description: 'האישון אסור'
  },
  {
    label: 'חניה',
    icon: TbParking,
    description: 'יש חניה'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
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
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;