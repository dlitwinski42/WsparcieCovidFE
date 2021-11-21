import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ActiveDonations from "../ActiveDonations";
import ActiveGiftCards from "../ActiveGiftCards";
import ActiveOrders from "../ActiveOrders";

const EntrepreneurPanel = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return (
    <>
      <div>Entrepreneur Panel</div>;
      <Link
        to={{
          pathname: `/addProduct`,
        }}
      >
        {" "}
        <Button variant="contained">Dodaj produkt</Button>{" "}
      </Link>
      <ActiveDonations />
      <ActiveGiftCards />
      <ActiveOrders />
    </>
  );
};
export default EntrepreneurPanel;
