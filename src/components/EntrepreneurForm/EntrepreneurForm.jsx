import React from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Controller } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

const EntrepreneurForm = ({ register, errors, control }) => {
  return (
    <>
      {" "}
      <Grid item xs={6}>
        <TextField
          defaultValue="Nazwa przedsiębiorstwa"
          {...register("name", { required: true })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          defaultValue="Nr Telefonu"
          {...register("phoneNumber", { required: true })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          defaultValue="Krótki opis"
          {...register("description", { required: true })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          defaultValue="Nr NIP"
          {...register("NIPNumber", { required: true })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          defaultValue="Nr Konta"
          {...register("BankAccountNumber", { required: true })}
        />
      </Grid>
      <Grid item xs={6}>
        {errors.name && <span>Nazwa jest wymagana</span>}
        <input {...register("supportDonation")} type="checkbox" />
        Bezpośrednie wsparcie
        <br />
        <input {...register("supportGiftCard")} type="checkbox" />
        Karty Podarunkowe
        <br />
        <input {...register("supportOrder")} type="checkbox" />
        Zamówienie
      </Grid>
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
