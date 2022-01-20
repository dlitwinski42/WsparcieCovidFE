import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import { paths } from "../../strings.js";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { accessToken, signIn } = useContext(AuthContext);
  const onSubmit = async (data) => {
    console.log(data);
    if (await signIn(data)) {
      history.push(paths.accountView);
    }
  };

  const history = useHistory();

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
    </form>
  );
};
export default Login;
