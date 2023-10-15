"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = ({ lng }: { lng: string }) => {
  const router = useRouter();

  return (
    <div className="flex flex-row-reverse gap-1 items-center">
      <div className="hidden sm:flex">
        <div className="text-base font-light">bnb</div>      
        <div className="text-base font-semibold -ml-1">Safe</div>
      </div>
      <div className="shrink-0">
      <Image
        onClick={() => router.push(`/${lng}`)}
        className="flex cursor-pointer h-8 w-8"
        src="/images/logo.svg"
        height="30"
        width="30"
        alt=""
      />
      </div>
    </div>
  );
};

export default Logo;
