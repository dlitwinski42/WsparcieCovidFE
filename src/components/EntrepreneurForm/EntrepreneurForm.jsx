import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";

const EntrepreneurForm = ({ register, errors, control }) => {
  return (
    <>
      {" "}
      <br />
      ======= Informacje o Przedsiębiorcy ========
      <br />
      <TextField
        defaultValue="Nazwa przedsiębiorstwa"
        {...register("name", { required: true })}
      />
      <br />
      <TextField
        defaultValue="Nr Telefonu"
        {...register("phoneNumber", { required: true })}
      />
      <br />
      <TextField
        defaultValue="Krótki opis"
        {...register("description", { required: true })}
      />
      <br />
      <TextField
        defaultValue="Nr NIP"
        {...register("NIPNumber", { required: true })}
      />
      <br />
      <TextField
        defaultValue="Nr Konta"
        {...register("BankAccountNumber", { required: true })}
      />
      <br />
      {errors.name && <span>Nazwa jest wymagana</span>}
      <input {...register("supportDonation")} type="checkbox" />
      Bezpośrednie wsparcie
      <input {...register("supportGiftCard")} type="checkbox" />
      Bezpośrednie wsparcie
      <input {...register("supportOrder")} type="checkbox" />
      Bezpośrednie wsparcie
      {/* <Controller
        name="supportDonation"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
        shouldUnregister={true}
      />{" "}
      Bezpośrednie wsparcie
      <br />
      <Controller
        name="supportGiftCard"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
        shouldUnregister={true}
      />{" "}
      Karty Podarunkowe
      <br />
      <Controller
        name="supportOrder"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
        shouldUnregister={true}
      />{" "}
      Zamówienie */}
    </>
  );
};
export default EntrepreneurForm;
