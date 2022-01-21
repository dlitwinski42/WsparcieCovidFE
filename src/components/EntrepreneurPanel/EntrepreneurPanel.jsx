import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../strings";
import { AuthContext } from "../../store/auth";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ActiveDonations from "../ActiveDonations";
import ActiveGiftCards from "../ActiveGiftCards";
import ActiveOrders from "../ActiveOrders";
import AvailableGiftCards from "../AvailableGiftCards";
import EntrepreneurService from "../../services/entrepreneurs";

const EntrepreneurPanel = () => {
  const { accessToken, signOut, role, roleId } = useContext(AuthContext);
  const history = useHistory();
  const [order, setOrder] = useState(false);
  const [giftcard, setGiftCard] = useState(false);
  const [donation, setDonation] = useState(false);
  useEffect(() => getEntrepreneur(), []);

  const seeReviews = async (entrepreneurId) => {
    const entrepreneur = await EntrepreneurService.getSingle(entrepreneurId);
    console.log("Zobacz recenzje przedsiębiorcy" + entrepreneur.id);
    history.push({
      pathname: `${paths.reviewList}/${entrepreneur.id}`,
      state: { entrepreneur },
    });
  };

  const getEntrepreneur = async () => {
    let data = await EntrepreneurService.getSingle(roleId);
    console.log(data);
    setOrder(data.supportMethods.canOrder);
    setDonation(data.supportMethods.canDonate);
    setGiftCard(data.supportMethods.canGiftCard);
  };

  const createProduct = () => {
    history.push({
      pathname: `/addProduct`,
    });
  };

  return (
    <>
      <h1> Panel Przedsiębiorcy </h1>
      {order && (
        <Button variant="contained" onClick={() => createProduct()}>
          Dodaj nowy produkt
        </Button>
      )}
      <br />
      <Button variant="contained" onClick={() => seeReviews(roleId)}>
        Zobacz recenzje swojej firmy
      </Button>
      {donation && <ActiveDonations />}
      {giftcard && <ActiveGiftCards />}
      {giftcard && <AvailableGiftCards />}
      {order && <ActiveOrders />}
    </>
  );
};
export default EntrepreneurPanel;
