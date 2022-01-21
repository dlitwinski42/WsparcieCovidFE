import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import AdminDonations from "../AdminDonations";
import AdminGiftCards from "../AdminGiftCards";
import AdminReviews from "../AdminReviews";

const WhoAmI = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  return (
    <>
      <h1>{`Panel admina`}</h1>
      <AdminDonations />
      <AdminGiftCards />
      <AdminReviews />
    </>
  );
};
export default WhoAmI;
