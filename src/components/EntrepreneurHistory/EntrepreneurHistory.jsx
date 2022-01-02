import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import ConfirmedDonations from "../ConfirmedDonations";
import UsedGiftCards from "../UsedGiftCards";
import DeliveredOrders from "../DeliveredOrders";

const EntrepreneurHistory = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return (
    <>
      <div>Entrepreneur History</div>
      <ConfirmedDonations />
      <UsedGiftCards />
      <DeliveredOrders />
    </>
  );
};
export default EntrepreneurHistory;
