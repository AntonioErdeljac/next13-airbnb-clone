"use client";

import { useState } from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SvgIcon } from "@mui/material";
import { styled } from '@mui/material/styles';
import LangIconc from '@/public/icons/language.svg'
import { languages } from "../../i18n/settings";
import Link from "next/link";

interface Props {
  lng: string;
}
<div        className="text-base font-extralight text-slate-400"></div>

const LangButton = styled(Button)({
    textTransform: "none",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: "200",
    "--tw-text-opacity": "1",
    color: "rgb(148 163 184 / var(--tw-text-opacity))"
});

const buttonIcon = <SvgIcon component={LangIconc} htmlColor='white' />

const languagesToIcons: Record<
  (typeof languages)[number],
  { unic: string; text: string }
> = {
  he_IL: { unic: "IL", text: "עברית" },
  en: { unic: "US", text: "English" },
  fr: { unic: "FR", text: "Français" },
};

export const LanaguageSwitcher: React.FC<Props> = ({ lng }) => {
  const setNewLanguage = (lng: string) => {
    const location = window.location;
    const parts = location.pathname.split("/");
    parts.splice(0, 2);
    return [lng, ...parts].join("/");
  };
  const contents = languages
    .filter((l) => lng !== l)
    .map((l, index) => {
      return (
        <MenuItem key={l} className="gap-2">
          {getUnicodeFlagIcon(languagesToIcons[l].unic)} <a href={`/${setNewLanguage(l)}`}>{languagesToIcons[l].text}</a>
        </MenuItem>
      );
    });

  const selectedOption = (
    <div>
        {languagesToIcons[lng].text}
    </div>
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <LangButton 
        startIcon={buttonIcon}
        onClick={handleClick}
        style={{direction: "ltr"}}
      >
        <div className="block">
          { selectedOption}
        </div>
      </LangButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {contents}
      </Menu>
    </div>
  );
};
