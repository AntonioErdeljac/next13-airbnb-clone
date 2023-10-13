'use client';

import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../i18n/settings";
import Button from "./Button";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

interface Props {
  lng: string;
}

const languagesToIcons: Record<
  (typeof languages)[number],
  { unic: string; text: string }
> = {
  he_IL: { unic: "IL", text: "עברית" },
  en: { unic: "US", text: "English" },
};

export const LanaguageSwitcher: React.FC<Props> = ({ lng }) => {
  const setNewLanguage = (lng: string) => {
    const location = window.location;
    const parts = location.pathname.split('/');    
    parts.splice(0, 2);
    return [lng, ...parts].join('/');
  }
  const contents = languages
    .filter((l) => lng !== l)
    .map((l, index) => {
      return (
        <li key={l}>
          <a href={`/${setNewLanguage(l)}`}>
            {getUnicodeFlagIcon(languagesToIcons[l].unic)} {languagesToIcons[l].text}
          </a>
        </li>
      );
    });

  const selectedOption = (
    <div>
      <div className="selected-lang">
        {getUnicodeFlagIcon(languagesToIcons[lng].unic)} {languagesToIcons[lng].text}
      </div>
    </div>
  );
  return (
    <div className="mt-8 w-20">
      <nav>
        <div className="lang-menu" dir="ltr">
          {selectedOption}
          <ul>{contents}</ul>
        </div>
      </nav>
    </div>
  );
};
