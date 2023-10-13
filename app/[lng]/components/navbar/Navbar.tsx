import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { LanaguageSwitcher } from "../LanaguageSwitcher";

interface NavbarProps {
  currentUser?: SafeUser | null;
  lng: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, lng }) => {
  return (
    <div className="w-full bg-white z-10 shadow-sm">
      <div
        className="
        py-4 
        border-b-[1px]
        "
      >
        <div
          className="
          flex 
          flex-row
          items-center 
          justify-between
          gap-3
          md:gap-0"
          style={{direction: "rtl"}}
        >
          <div className="flex flex-row gap-1 md:gap-0">
            <Logo lng={lng} />
            <LanaguageSwitcher lng={lng} />
          </div>
          <Search lng={lng} />
          <UserMenu currentUser={currentUser} lng={lng} />
        </div>
      </div>
  </div>
  );
};

export default Navbar;
