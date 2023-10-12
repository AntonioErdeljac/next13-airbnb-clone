"use client";

import LoginModal from "../components/modals/LoginModal";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = ({ lng }: { lng: string }) => {
  return (
    <>
      <LoginModal lng={lng} />
      <SearchModal lng={lng} />
      <RentModal lng={lng} />
    </>
  );
};

export default ModalsProvider;
