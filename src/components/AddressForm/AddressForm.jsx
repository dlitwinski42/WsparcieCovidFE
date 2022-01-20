import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const AddressForm = ({ register, errors }) => {
  return (
    <>
      {" "}
      <Grid item xs={6}>
        <TextField
          defaultValue="Miasto"
          {...register("city", { required: true })}
        />
        {errors.city && <span>Miasto jest wymagane</span>}
      </Grid>
      <Grid item xs={6}>
        <TextField
          defaultValue="Ulica"
          {...register("street", { required: true })}
        />
        {errors.street && <span>Miasto jest wymagane</span>}
      </Grid>
      <Grid item xs={6}>
        <TextField
          defaultValue="Nr Domu"
          {...register("houseNumber", { required: true })}
        />
        {errors.city && <span>Miasto jest wymagane</span>}
      </Grid>
      <Grid item xs={6}>
        <TextField
          defaultValue="Nr Mieszkania"
          {...register("flatNumber", { required: true })}
        />
        {errors.city && <span>Miasto jest wymagane</span>}
      </Grid>
    </>
  );
};
export default AddressForm;
