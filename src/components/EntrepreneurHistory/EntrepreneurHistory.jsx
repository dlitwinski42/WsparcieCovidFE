import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import ConfirmedDonations from "../ConfirmedDonations";
import UsedGiftCards from "../UsedGiftCards";
import DeliveredOrders from "../DeliveredOrders";

const EntrepreneurHistory = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return (
    <>
      <h1> Historia Wsparcia </h1>
      <ConfirmedDonations />
      <UsedGiftCards />
      <DeliveredOrders />
    </>
  );
};
export default EntrepreneurHistory;
