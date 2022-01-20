import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import ContributorDonations from "../ContributorDonations";
import ContributorGiftCards from "../ContributorGiftCards";

const ContributorHistory = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return (
    <>
      <h1> Twoja Historia Wsparcia </h1>
      <ContributorDonations />
      <ContributorGiftCards />
    </>
  );
};
export default ContributorHistory;
