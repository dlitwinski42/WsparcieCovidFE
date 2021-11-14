import React from "react";
import TextField from "@mui/material/TextField";

const AddressForm = ({ register, errors }) => {
  return (
    <>
      {" "}
      <br />
      ======= Adres ========
      <br />
      <TextField
        defaultValue="Miasto"
        {...register("city", { required: true })}
      />
      {errors.city && <span>Miasto jest wymagane</span>}
      <br />
      <TextField
        defaultValue="Ulica"
        {...register("street", { required: true })}
      />
      {errors.street && <span>Miasto jest wymagane</span>}
      <br />
      <TextField
        defaultValue="Nr Domu"
        {...register("houseNumber", { required: true })}
      />
      {errors.city && <span>Miasto jest wymagane</span>}
      <br />
      <TextField
        defaultValue="Nr Mieszkania"
        {...register("flatNumber", { required: true })}
      />
      {errors.city && <span>Miasto jest wymagane</span>}
      <br />
    </>
  );
};
export default AddressForm;
