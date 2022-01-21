import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../store/auth";
import ConfirmedDonations from "../ConfirmedDonations";
import UsedGiftCards from "../UsedGiftCards";
import DeliveredOrders from "../DeliveredOrders";
import EntrepreneurService from "../../services/entrepreneurs";

const EntrepreneurHistory = () => {
  const { accessToken, signOut, role, roleId } = useContext(AuthContext);
  const [order, setOrder] = useState(false);
  const [giftcard, setGiftCard] = useState(false);
  const [donation, setDonation] = useState(false);
  useEffect(() => getEntrepreneur(), []);

  const getEntrepreneur = async () => {
    let data = await EntrepreneurService.getSingle(roleId);
    console.log(data);
    setOrder(data.supportMethods.canOrder);
    setDonation(data.supportMethods.canDonate);
    setGiftCard(data.supportMethods.canGiftCard);
  };

  return (
    <>
      <h1> Historia Wsparcia </h1>
      {donation && <ConfirmedDonations />}
      {giftcard && <UsedGiftCards />}
      {order && <DeliveredOrders />}
    </>
  );
};
export default EntrepreneurHistory;
