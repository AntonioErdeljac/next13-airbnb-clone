'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import useRentModal from '@/app/hooks/useRentModal';

import Modal from './Modal';
import Counter from '../inputs/Counter';
import CategoryInput from '../inputs/CategoryInput';
import PhoneInput from '../inputs/PhoneInput';
import BureauSelect from '../inputs/BureauSelect';
import { allCategories } from '../navbar/Categories';
import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import Heading from '../Heading';
import { toggleCategoryFilter } from '../CategoryBox';
import { useTranslation } from '@/app/i18n/client';
import Banner from '@/app/[lng]/components/Banner';

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
      imageSrc: '',
      title: '',
      description: '',
      categories: [],
      phoneNumber: '',
    },
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
      .post('/api/listings', data)
      .then(() => {
        toast.success(t('listingSuccessfullyAddedToast'));
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error(t('somethingWentWrongToast'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return t('createLabel');
    }

    return t('nextLabel');
  }, [step, t]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return t('backLabel');
  }, [step, t]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title={t('categories')} subtitle={t('selectCategories')} />
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
                  'categories',
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
        <Heading title={t('rentModalLocationTitle')} subtitle="" />
        <BureauSelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
          lng={lng}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title={t('propertyDetails')} subtitle="" />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title={t('propertyCapacity')}
          subtitle={t('rentModalCapacitySubtitle')}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title={t('bedroomTitle')}
          subtitle={t('rentModalBedroomSubtitle')}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title={t('bathroomTitle')}
          subtitle={t('rentModalBathroomSubtitle')}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-x-8 gap-y-4">
        <Heading title={t('listingTitle')} />
        <div className="-my-6"></div>
        <Banner title={undefined} text={t('listingSecurityMessage')} />
        <Input
          id="title"
          label={t('title')}
          maxLength={40}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <PhoneInput
          id="phoneNumber"
          label={t('phoneNumberLabel')}
          value={phoneNumber}
          onChange={(value) => setCustomValue('phoneNumber', value)}
          control={control}
          errors={errors}
          required={false}
        />
        <hr />
        <TextArea
          id="description"
          label={t('listingDescription')}
          disabled={isLoading}
          register={register}
          errors={errors}
          maxLength={500}
        />
        <div className="-my-6"></div>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title={t('rentModalMainTitle')}
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
