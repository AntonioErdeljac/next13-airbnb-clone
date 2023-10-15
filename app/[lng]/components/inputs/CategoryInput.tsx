'use client';

import { useTranslation } from "@/app/i18n/client";
import { ICategory } from "../types";

interface CategoryBoxProps extends Omit<ICategory, "description"> {
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
        flex-row
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      {Icon}
      <div className="font-semibold">
        {t(label)}
      </div>
    </div>
   );
}
 
export default CategoryBox;