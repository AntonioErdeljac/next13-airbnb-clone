"use client";

import qs from "query-string";
import { useCallback, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearchModal";
import { useTranslation } from "@/app/i18n/client";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import BureauSelect, { BureauSelectValue } from "../inputs/BureauSelect";
import Heading from "../Heading";
import { STEPS } from "../types";

const SearchModal = ({ lng }: { lng: string }) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { t } = useTranslation(lng);

  const [location, setLocation] = useState<BureauSelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    searchModal.onClose();
    router.push(url);
  }, [
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    bathroomCount,
    params,
  ]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title={t("searchModalHeading")} subtitle="" />
      <BureauSelect
        value={location}
        onChange={(value) => setLocation(value as BureauSelectValue)}
        lng={lng}
      />
    </div>
  );

  const step = useSearchModal((state) => state.step);
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={t("searchModalDateTitle")}
          subtitle={t("searchModalDateSubtitle")}
        />
        <div style={{ direction: "ltr" }}>
          <Calendar
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title={t("searchModalNeedsTitle")} subtitle="" />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title={t("searchModalNeedsPeople")}
          subtitle=""
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title={t("bedroomTitle")}
          subtitle={t("searchModalNeedsBedrooms")}
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title={t("bathroomTitle")}
          subtitle={t("searchModalNeedsBathrooms")}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title={t("searchModalTitle")}
      actionLabel={t("searchModalTitle")}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
