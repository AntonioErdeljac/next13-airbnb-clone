"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = ({ lng }: { lng: string }) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push(`/${lng}`)}
      className="hidden md:block cursor-pointer"
      src="/images/logo.png"
      height="100"
      width="100"
      alt="Logo"
    />
  );
};

export default Logo;
