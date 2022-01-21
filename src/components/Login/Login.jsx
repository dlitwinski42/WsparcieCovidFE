import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import { paths } from "../../strings.js";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { accessToken, signIn } = useContext(AuthContext);
  const onSubmit = async (data) => {
    if (await signIn(data)) {
      history.push(paths.accountView);
    } else {
      setFailure(true);
    }
  };
  const [failure, setFailure] = useState(false);

  const history = useHistory();

  const handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailure(false);
  };

  if (accessToken) {
    return <Redirect to={paths.accountView} />;
  }

  return (
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
            <h3>Logowanie</h3>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Login"
              {...register("login", { required: true })}
            />
            {errors.login && <span>Login jest wymagany</span>}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Hasło"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>Hasło jest wymagane</span>}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ justifyContent: "center", display: "flex" }}
          >
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
          Nieprawidłowe dane logowania!
        </Alert>
      </Snackbar>
    </form>
  );
};
export default Login;
