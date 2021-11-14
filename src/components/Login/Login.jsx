import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import { paths } from "../../strings.js";
import TextField from "@mui/material/TextField";

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
      {/* register your input into the hook by invoking the "register" function */}
      <TextField defaultValue="test" {...register("login")} />
      {errors.login && <span>Login jest wymagany</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <TextField
        type="password"
        {...register("password", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>Hasło jest wymagane</span>}

      <input type="submit" />
    </form>
  );
};
export default Login;
