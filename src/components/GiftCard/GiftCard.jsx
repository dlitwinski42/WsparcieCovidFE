import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../store/auth";
import GiftCardService from "../../services/giftcards";

const GiftCard = () => {
  const {
    register,
    unregister,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [code, setCode] = React.useState();
  const onSubmit = async (data) => {
    const formValues = {
      amount: data.amount,
      entrepreneurId: location.state.entrepreneur.id,
      contributorId: Number(roleId),
    };
    console.log(formValues);
    const returnVal = await GiftCardService.create(formValues);
    setCode(returnVal.data.redeemCode);
    console.log(returnVal);
  };

  const location = useLocation();
  console.log(location.state);
  const { accessToken, role, roleId } = useContext(AuthContext);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{`Wybrano przedsiębiorstwo o nazwie ${location.state.entrepreneur.name} i id ${location.state.entrepreneur.id}`}</h3>
      <TextField
        defaultValue="20"
        {...register("amount", { required: true })}
      />
      {errors.amount && <span>Kwota wsparcia jest wymagana</span>}
      <input type="submit" />
      {code && <span>Kod do wykorzystania karty podarunkowej: {code}</span>}
    </form>
  );
};
export default GiftCard;
