import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";

const getResult = (accessToken, role, roleId) => {
  if (accessToken) {
    return (
      <div>
        {" "}
        Zalogowano jako {role} o id {roleId}{" "}
      </div>
    );
  } else {
    return <div> Niezalogowany </div>;
  }
};

const WhoAmI = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  return <>{getResult(accessToken, role, roleId)}</>;
};
export default WhoAmI;
