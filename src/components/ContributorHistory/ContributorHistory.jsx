import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import ContributorDonations from "../ContributorDonations";
import ContributorGiftCards from "../ContributorGiftCards";

const ContributorHistory = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return (
    <>
      <div>Contributor History</div>
      <ContributorDonations />
      <ContributorGiftCards />
    </>
  );
};
export default ContributorHistory;
