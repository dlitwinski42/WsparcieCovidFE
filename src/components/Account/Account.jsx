import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import { paths } from "../../strings.js";
import ContributorPanel from "../ContributorPanel";
import EntrepreneurPanel from "../EntrepreneurPanel";

const Account = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return (
    <>
      {role === "Contributor" ? <ContributorPanel /> : <EntrepreneurPanel />}
      <Button color="inherit" onClick={signOut}>
        Wyloguj
      </Button>
    </>
  );
};
export default Account;
