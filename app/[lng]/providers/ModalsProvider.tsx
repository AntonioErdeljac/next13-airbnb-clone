"use client";

import BecomeHostModal from "../components/modals/BecomeHostModal";
import LoginModal from "../components/modals/LoginModal";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = ({ lng }: { lng: string }) => {
  return (
    <>
      <LoginModal lng={lng} />
      <SearchModal lng={lng} />
      <RentModal lng={lng} />
      <BecomeHostModal lng={lng} />
    </>
  );
};

export default ModalsProvider;
