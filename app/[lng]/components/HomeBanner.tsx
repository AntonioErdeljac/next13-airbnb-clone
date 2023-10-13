'use client';

import { useTranslation } from "@/app/i18n/client";
import Banner from './Banner';

interface HomeBannerProps {
  isLoggedIn: boolean;
  name?: string;
  isHost?: boolean;
  lng: string;
}

const HomeBanner: React.FC<HomeBannerProps> = ({ isLoggedIn, isHost, name, lng }) => {
  const { t } = useTranslation(lng);

  if (isLoggedIn) {
    if (isHost) {
      return (
        <Banner title={t('homeBannerHostPostLoginTitle')} text={t('homeBannerHostPostLoginText', { name })} />
      );
    }
    else {
      return (
        <Banner title={t('homeBannerGuestPostLoginTitle')} text={t('homeBannerGuestPostLoginText', { name })} />
      );
    }
  }
  else {
    return (
      <Banner title={t('homeBannerPreLoginTitle')} text={t('homeBannerPreLoginText')} />
    );
  }
}
 
export default HomeBanner;