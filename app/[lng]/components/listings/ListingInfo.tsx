"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useBureaus from "@/app/hooks/useBureaus";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { useTranslation } from "@/app/i18n/client";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

type Category = {
  icon: IconType;
  label: string;
  description: string;
};

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  categories: Category[];
  locationValue: string;
  lng: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  categories,
  locationValue,
  lng,
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
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
