import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../store/auth";
import DonationService from "../../services/donations";
import EntrepreneurService from "../../services/entrepreneurs";

const Donation = () => {
  const {
    register,
    unregister,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supportDonation: false,
    },
  });
  const [code, setCode] = React.useState(null);
  const [bankNum, setBankNum] = React.useState(null);
  const onSubmit = async (data) => {
    const formValues = {
      amount: data.amount,
      entrepreneurId: location.state.entrepreneur.id,
      contributorId: Number(roleId),
    };
    console.log(formValues);
    const returnVal = await DonationService.create(formValues);
    setCode(returnVal.data.donationCode);
    console.log(returnVal);
  };

  const getEntrepreneur = async () => {
    if (code != null) {
      const entrepreneur = await EntrepreneurService.getSingle(
        location.state.entrepreneur.id
      );
      console.log(entrepreneur);
      setBankNum(entrepreneur.bankAccountNumber);
    }
  };

  useEffect(() => getEntrepreneur(), [code]);

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
      <br />
      {bankNum && (
        <div>
          <span>Nr konta: {bankNum} </span>
          <br />
          <span>Prosimy w tytule przelewu wpisać następujący kod: {code}</span>
        </div>
      )}
    </form>
  );
};
export default Donation;
