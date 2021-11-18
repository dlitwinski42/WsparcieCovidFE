import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";

const ContributorPanel = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return <div>Contributor Panel</div>;
};
export default ContributorPanel;
