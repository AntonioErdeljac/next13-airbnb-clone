'use client';

import LoginModal from "../components/modals/LoginModal";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <SearchModal />
      <RentModal />
    </>
   );
}
 
export default ModalsProvider;