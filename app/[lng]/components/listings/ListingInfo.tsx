"use client";

import { IconType } from "react-icons";

import useBureaus from "@/app/hooks/useBureaus";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { useTranslation } from "@/app/i18n/client";
import { formatPhoneNumber } from "react-phone-number-input";
import { TbBrandWhatsapp } from "react-icons/tb";

type Category = {
  icon: IconType;
  label: string;
  description: string;
};

interface ListingInfoProps {
  user: SafeUser;
  title: string;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  categories: Category[];
  locationValue: string;
  lng: string;
  phoneNumber: string | null;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  title,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  categories,
  locationValue,
  lng,
  phoneNumber
}) => {
  const { getByValue } = useBureaus();
  const { t } = useTranslation(lng);

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>
            {t("beHostedAt")} {user?.name}
          </div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} {t("guests")}
          </div>
          <div>
            {roomCount} {t("bedrooms")}
          </div>
          <div>
            {bathroomCount} {t("bathrooms")}
          </div>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-3 gap-4">
        {categories &&
          categories.map((category) => (
            <ListingCategory
              key={category.label}
              icon={category.icon}
              label={category?.label}
              description={category?.description}
              lng={lng}
            />
          ))}
      </div>
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500 break-words"
      >
        {description}
      </div>
      {phoneNumber && 
      <div className="flex flex-col gap-8">
        <hr />
        <div className="flex flex-row gap-4">
          <div className="text-lg font-semibold text-neutral-500 break-words">
              {t("phoneNumberLabel")}
          </div>
          <div className="
          text-lg font-light text-neutral-500 break-words justify-start"
          style={{direction: "ltr"}}>
            {formatPhoneNumber(phoneNumber)}
          </div>
          <a target="_blank" href={`https://wa.me/${phoneNumber}?text=Message%20from%20https%3A%2F%2Fsafebnb.com%20about%20your%20listing%20${title}%3A%0A`} rel="noopener noreferrer">
            <TbBrandWhatsapp size={26} />
          </a>
        </div>
      </div>}
    </div>
  );
};

export default ListingInfo;
