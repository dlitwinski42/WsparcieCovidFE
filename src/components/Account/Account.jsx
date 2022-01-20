import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import { paths } from "../../strings.js";
import ContributorPanel from "../ContributorPanel";
import ContributorHistory from "../ContributorHistory";
import EntrepreneurPanel from "../EntrepreneurPanel";
import AdminPanel from "../AdminPanel";

const Account = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return (
    <>
      {role === "Contributor" && <ContributorHistory />}
      {role === "Entrepreneur" && <EntrepreneurPanel />}
      {role === "Admin" && <AdminPanel />}
    </>
  );
};
export default Account;
