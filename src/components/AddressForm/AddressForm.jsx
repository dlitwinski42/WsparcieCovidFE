import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const AddressForm = ({ register, errors }) => {
  return (
    <>
      {" "}
      <Grid item xs={6}>
        <TextField label="Miasto" {...register("city", { required: true })} />
        {errors.city && (
          <span>
            <br />
            Miasto jest wymagane
          </span>
        )}
      </Grid>
      <Grid item xs={6}>
        <TextField label="Ulica" {...register("street", { required: true })} />
        {errors.street && (
          <span>
            <br />
            Ulica jest wymagane
          </span>
        )}
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Nr Domu"
          {...register("houseNumber", { required: true })}
        />
        {errors.city && (
          <span>
            <br />
            Nr domu jest wymagany
          </span>
        )}
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Nr Lokalu"
          {...register("flatNumber", { required: true })}
        />
        {errors.city && (
          <span>
            <br />
            Nr lokalu jest wymagany
          </span>
        )}
      </Grid>
    </>
  );
};
export default AddressForm;
