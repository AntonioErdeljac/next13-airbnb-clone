'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import useBureaus from '@/app/hooks/useBureaus';
import { useTranslation } from "@/app/i18n/client";

import { STEPS } from '../modals/SearchModal';

const Search = ({ lng }: { lng: string }) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useBureaus();
  const { t } = useTranslation(lng);

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return t('searchBarRegion');
  }, [locationValue, getByValue, t]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${t('days')} ${diff}`;
    }

    return t('searchBarDates');
  }, [startDate, endDate, t]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} ${t('guests')}`;
    }

    return t('searchBarGuests');
  }, [guestCount, t]);

  return ( 
    <div
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
        flex 
        flex-row 
        items-center 
        justify-between
        "
        >
        <div 
          onClick={() => searchModal.onOpen(STEPS.LOCATION)}
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel}
        </div>
        <div 
          onClick={() => searchModal.onOpen(STEPS.DATE)}
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel}
        </div>
        <div 
          onClick={() => searchModal.onOpen(STEPS.INFO)}
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;