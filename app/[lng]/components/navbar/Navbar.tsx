import { SafeUser } from "@/app/types";
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
    <div className="w-full bg-white z-10 shadow-sm p-2 md:p-6" style={{direction: "rtl"}}>
        <div
          className="
          flex 
          flex-row-reverse
          items-center 
          justify-between
          gap-1
          lg:gap-3
          md:gap-0"
        >
          <UserMenu currentUser={currentUser} lng={lng} />
          <Search lng={lng} />
          <div className="flex flex-row-reverse sm:gap-1 md:gap-6">
            <LanaguageSwitcher lng={lng} />
            <Logo lng={lng} />
          </div>
        </div>
  </div>
  );
};

export default Navbar;
