import { dir } from 'i18next'
import { Nunito } from "next/font/google";

import Navbar from "@/app/[lng]/components/navbar/Navbar";
import LoginModal from "@/app/[lng]/components/modals/LoginModal";
import SearchModal from "@/app/[lng]/components/modals/SearchModal";
import RentModal from "@/app/[lng]/components/modals/RentModal";

import ToasterProvider from "@/app/[lng]/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

export const metadata = {
  title: "Safebnb",
  description: "אירוח בשעת חירום",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;

  params: {
    lng: string;
  };
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} lng={lng} />
        </ClientOnly>
        <div className="pb-20 pt-40">{children}</div>
      </body>
    </html>
  );
}
