'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '@/app/types';

import Heading from '@/app/[lng]/components/Heading';
import Container from '@/app/[lng]/components/Container';
import ListingCard from '@/app/[lng]/components/listings/ListingCard';
import { useTranslation } from '@/app/i18n/client';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
  lng: string;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
  lng,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const { t } = useTranslation(lng);

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('הזמנה בוטלה');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="איפה התארחתי" subtitle="מקומות בהם התארחתי/אתארח" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel={t('cancelOrder')}
            currentUser={currentUser}
            lng={lng}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
