"use client";

import LoginModal from "../components/modals/LoginModal";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = ({ lng }: { lng: string }) => {
  return (
    <>
      <LoginModal />
      <SearchModal />
      <RentModal lng={lng} />
    </>
  );
};

export default ModalsProvider;
