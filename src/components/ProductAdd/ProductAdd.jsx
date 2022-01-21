import React, { useState, useContext } from "react";
import { AuthContext } from "../../store/auth";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import ProductsService from "../../services/products";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductAdd = () => {
  const {
    register,
    unregister,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  const { accessToken, signOut, roleId } = useContext(AuthContext);
  const onSubmit = async (data) => {
    console.log(data);
    if (!isNaN(parseInt(data.price)) && parseInt(data.price) > 0) {
      const formValues = {
        price: data.price,
        name: data.name,
        description: data.description,
        entrepreneurId: Number(roleId),
      };
      const returnVal = await ProductsService.create(formValues);
      console.log(returnVal);
      if (returnVal.status === "SUCCESS") {
        setSuccess(true);
      } else {
        setMessage("Coś poszło nie tak!");
        setFailure(true);
      }
    } else {
      setMessage("Cena musi być dodatnią liczbą!");
      setFailure(true);
    }
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailure(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            padding: 20,
            justifyContent: "center",
          }}
        >
          <Grid
            container
            xs={4}
            spacing={3}
            style={{
              border: "2px solid black",
              borderRadius: 25,
              boxShadow: "0 0 3px 3px gray",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Grid item xs={12} style={{ align: "center" }}>
              <h3>Dodawanie produktu</h3>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Nazwa"
                {...register("name", { required: true })}
              />
              <br />
              {errors.name && <span>Nazwa jest wymagana</span>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Cena"
                {...register("price", { required: true })}
              />
              <br />
              {errors.price && <span>Cena jest wymagana</span>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Opis"
                multiline
                rows={5}
                style={{ width: "95%" }}
                {...register("description", { required: true })}
              />
              <br />
              {errors.description && <span>Opis jest wymagany</span>}
            </Grid>
            <Grid item xs={12} style={{ display: "flex" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: 10 }}
              >
                {" "}
                Prześlij{" "}
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Operacja przebiegła pomyślnie!
        </Alert>
      </Snackbar>
      <Snackbar
        open={failure}
        autoHideDuration={6000}
        onClose={handleFailureClose}
      >
        <Alert
          onClose={handleFailureClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default ProductAdd;
