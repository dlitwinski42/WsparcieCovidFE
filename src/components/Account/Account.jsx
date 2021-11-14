import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import { paths } from "../../strings.js";

const Account = () => {
  const { accessToken, signOut } = useContext(AuthContext);

  return (
    <Button color="inherit" onClick={signOut}>
      Wyloguj
    </Button>
  );
};
export default Account;
