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
        <Banner title={t('homeBannerHostPostLoginTitle')} text={t('homeBannerHostPostLoginText', { name })}>
            <div className="flex flex-row gap-1 md:gap-0">
              <a href={`/${lng}/`} className="rounded-lg hover:bg-slate-100 px-3 py-1 mb-2 text-cyan-800 underline">{t('gotoMainPage')}</a>
              <a href={`/${lng}/properties`} className="rounded-lg hover:bg-slate-100 px-3 py-1 mb-2 text-cyan-800 underline">{t('gotoMyPropertiesPage')}</a>
            </div>
        </Banner>
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