'use client';

import { useRouter } from "next/navigation";
import { useTranslation } from '@/app/i18n/client';

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  resetLabel?: string
  lng: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle = "",
  showReset,
  resetLabel = "",
  lng
}) => {
  const router = useRouter();
  const { t } = useTranslation(lng);
  if (!title) {
    title = t('noMatchFound');
  }
  if (!subtitle) {
    subtitle = t('emptyStateSubtitle');
  }
  if (!resetLabel) {
    resetLabel = t('emptyStateReset');
  }

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label={resetLabel}
            onClick={() => router.push(`/${lng}`)}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;