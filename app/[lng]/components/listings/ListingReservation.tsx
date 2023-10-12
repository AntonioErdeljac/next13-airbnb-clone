'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import { useTranslation } from "@/app/i18n/client";

interface ListingReservationProps {
  dateRange: Range,
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  lng: string;
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  lng
}) => {
  const { t } = useTranslation(lng);
  
  return ( 
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div style={{direction: "ltr"}}>
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
      />
      </div>
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label={t('requestBooking')}
          onClick={onSubmit}
        />
      </div>
    </div>
   );
}
 
export default ListingReservation;