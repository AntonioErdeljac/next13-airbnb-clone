"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import useBureaus from "@/app/hooks/useBureaus";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Button from "../Button";
import { useTranslation } from "@/app/i18n/client";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  lng: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser = null,
  lng,
}) => {
  const router = useRouter();
  const { getByValue } = useBureaus();

  const { t } = useTranslation(lng);
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/${lng}/listings/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        group 
        p-2 
        border
        rounded-md 
        shadow-sm 
        hover:shadow-md"
    >
      <div className="flex flex-col gap-2 w-full h-full">
        <div className="font-semibold text-lg overflow-hidden text-ellipsis">{data.title}</div>
        <div className="font-normal">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.categories.map((categoryLabel) => t(categoryLabel)).join(", ") || '---'}
        </div>
        {reservation?.user /* reservation.userId !== currentUser?.id && */ && (
          <div className="font-normal">
            {t("orderFrom")}
            {reservation?.user.name} ({reservation?.user.email} )
          </div>
        )}
        {onAction && actionLabel && 
          <div className="mt-auto">
          <Button 
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
          </div>
        }
      </div>
    </div>
  );
};

export default ListingCard;
