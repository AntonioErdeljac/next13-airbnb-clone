"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import PhoneInput from "../inputs/PhoneInput"
import BureauSelect from "../inputs/BureauSelect";
import { allCategories } from "../navbar/Categories";
import Input from "../inputs/Input";
import TextArea from "../inputs/TextArea";
import Heading from "../Heading";
import { toggleCategoryFilter } from "../CategoryBox";
import { useTranslation } from "@/app/i18n/client";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  DESCRIPTION = 3,
}

const RentModal = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { 
    register, 
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      title: "",
      description: "",
      categories: [],
      phoneNumber: ''
    }
  });

  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const filters = watch('categories');
  const phoneNumber = watch('phoneNumber');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("המודעה נקלטה. תודה!\nListing was successfully added");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("משהו השתבש.\nSomething went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return "יצירה";
    }

    return "הבא";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "חזרה";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title={t("categories")} subtitle={t("selectCategories")} />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {allCategories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) =>
                setCustomValue(
                  "categories",
                  toggleCategoryFilter(filters, category)
                )
              }
              selected={filters.includes(item.label)}
              label={item.label}
              icon={item.icon}
              lng={lng}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="איפה הבית נמצא?/Where is the house located?"
          subtitle=""
        />
        <BureauSelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title={t("propertyDetails")} subtitle="" />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title={t("propertyCapacity")}
          subtitle="כמה נפשות אפשר ניתן לארח?/Number of guests you can host"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="חדרים/Bedrooms"
          subtitle="כמה חדרים פנויים לאירוח?/Number of available rooms for hosting?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="חדרי רחצה/Bathrooms"
          subtitle="כמה חדרי רחצה זמינים לשימוש?/Number of available bathrooms"
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="כותרת/Title" subtitle="כותרת המודעה/Listing title" />
        <Input
          id="title"
          label="כותרת/Title"
          maxLength={20}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <PhoneInput
          id="phoneNumber"
          label='טלפון  ליצירת קשר/phone number'
          value={phoneNumber}
          onChange={(value) => setCustomValue('phoneNumber', value)}
          control={control}
          errors={errors}
          required={false} />
        <hr />
        <TextArea
          id="description"
          label="הערות נוספות/Listing description"
          disabled={isLoading}
          register={register}
          errors={errors}
          maxLength={500}
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="אירוח בביתי/I want to host"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
