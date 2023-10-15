'use client';

import qs, { ParsedQuery } from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useTranslation } from '@/app/i18n/client';
import { ICategory } from './types';

interface CategoryBoxProps extends Omit<ICategory, "description"> {
  selected?: boolean;
  lng: string;
}

// NOTE: This mutates the filters[] parameter! 
export const toggleCategoryFilter = (filters: string[], category: string): string[] => {
  const index = filters.indexOf(category, 0);
  if (index > -1) {
    filters.splice(index, 1);
  } else {
    filters.push(category);
  }
  return filters;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon,
  label,
  selected,
  lng,

}) => {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery: ParsedQuery<string> = {};
    
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const cats = params?.getAll("categories") || [];
    const catArray = Array.isArray(cats) ? cats : [ cats ];
    const safeCats: string[] = catArray.map(v => v === null ? "" : v).filter(v => v !== "");
    const updatedQuery: any = {
      ...currentQuery,
      categories: toggleCategoryFilter(safeCats, label)
    }
   
    const url = qs.stringifyUrl({
      url: `/${lng}`,
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [label, router, params, lng]);

  return ( 
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      {icon}
      
      <div className="font-medium text-sm">
        {t(label)}
      </div>
    </div>
   );
}
 
export default CategoryBox;