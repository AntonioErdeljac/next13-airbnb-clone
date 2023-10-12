'use client';

import { useTranslation } from "@/app/i18n/client";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
  lng: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
  lng,
}) => {
  const { t } = useTranslation(lng);
  
  return ( 
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {t(label)}
      </div>
    </div>
   );
}
 
export default CategoryBox;