import { dir } from "i18next";
import { Rubik } from "next/font/google";

import Navbar from "@/app/[lng]/components/navbar/Navbar";
import LoginModal from "@/app/[lng]/components/modals/LoginModal";
import SearchModal from "@/app/[lng]/components/modals/SearchModal";
import RentModal from "@/app/[lng]/components/modals/RentModal";

import ToasterProvider from "@/app/[lng]/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import Container from "./components/Container";
import BecomeHostModal from "./components/modals/BecomeHostModal";

export const metadata = {
  title: "SAFEbnb",
  description: "אירוח בשעת חירום",
};

const font = Rubik({
  subsets: ["latin", "hebrew"]
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
      <body className={`font.className `}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal lng={lng} />
          <SearchModal lng={lng} />
          <RentModal lng={lng} />
          <BecomeHostModal lng={lng} />
          <Container>
            <div className="flex flex-col gap-2">
              <Navbar currentUser={currentUser} lng={lng} />
              <div>{children}</div>
            </div>
          </Container>
        </ClientOnly>
      </body>
    </html>
  );
}
