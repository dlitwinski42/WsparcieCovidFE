import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddressForm from "../AddressForm";
import EntrepreneurForm from "../EntrepreneurForm";
import MenuItem from "@mui/material/MenuItem";
import AuthService from "../../services/auth";
import { useHistory } from "react-router-dom";
import { paths } from "../../strings";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const roles = [
  {
    value: "Contributor",
    label: "Wspierający",
  },
  {
    value: "Entrepreneur",
    label: "Przedsiębiorca",
  },
];

const validateNIP = (nip) => {
  const nipWithoutDashes = nip.replace(/-/g, "");
  const reg = /^[0-9]{10}$/;
  if (reg.test(nipWithoutDashes) == false) {
    return false;
  } else {
    const digits = ("" + nipWithoutDashes).split("");
    const checksum =
      (6 * parseInt(digits[0]) +
        5 * parseInt(digits[1]) +
        7 * parseInt(digits[2]) +
        2 * parseInt(digits[3]) +
        3 * parseInt(digits[4]) +
        4 * parseInt(digits[5]) +
        5 * parseInt(digits[6]) +
        6 * parseInt(digits[7]) +
        7 * parseInt(digits[8])) %
      11;

    return parseInt(digits[9]) === checksum;
  }
};

const validateBankAccount = (number) => {
  const formatted = number.replace(/\s/g, "");
  const reg = /^\d{26}$/;
  return reg.test(formatted);
};

const validateTelNumber = (number) => {
  if (number.substr(0, 1) === "+") {
    const formatted = number.substr(1).replace(/\s/g, "");
    const reg = /^\d{9}$/;
    return reg.test(formatted);
  } else {
    const formatted = number.replace(/\s/g, "");
    const reg = /^\d{9}$/;
    return reg.test(formatted);
  }
};

const validateEmail = (email) => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
};

const Registration = () => {
  const handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailure(false);
  };

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
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState();
  const history = useHistory();
  const onSubmit = async (data) => {
    console.log(data);
    console.log(data.Password.length);
    console.log(!isNaN(parseInt(data.flatNumber)));
    if (data.confirmPassword !== data.Password) {
      setMessage("Nieprawidłowe dane: hasło niezgodne z potwierdzeniem hasła");
      setFailure(true);
    } else if (
      checked &&
      (isNaN(parseInt(data.flatNumber)) || parseInt(data.flatNumber) <= 0)
    ) {
      setMessage("Nieprawidłowe dane: numer mieszkania");
      setFailure(true);
    } else if (
      checked &&
      (isNaN(parseInt(data.houseNumber)) || parseInt(data.houseNumber) <= 0)
    ) {
      setMessage("Nieprawidłowe dane: numer domu");
      setFailure(true);
    } else if (data.Password.length < 6) {
      setMessage(
        "Nieprawidłowe dane: hasło powinno zawierać co najmniej 6 znaków"
      );
      setFailure(true);
    } else if (data.role === "Entrepreneur" && !validateNIP(data.NIPNumber)) {
      setMessage("Nieprawidłowe dane: błędny numer NIP");
      setFailure(true);
    } else if (
      data.role === "Entrepreneur" &&
      !validateBankAccount(data.BankAccountNumber)
    ) {
      setMessage("Nieprawidłowe dane: błędny numer konta");
      setFailure(true);
    } else if (
      data.role === "Entrepreneur" &&
      !validateTelNumber(data.phoneNumber)
    ) {
      setMessage("Nieprawidłowe dane: błędny numer telefonu");
      setFailure(true);
    } else if (data.role === "Entrepreneur" && !validateEmail(data.email)) {
      setMessage("Nieprawidłowe dane: błędny email");
      setFailure(true);
    } else {
      const returnVal = await AuthService.create(data);
      if (returnVal.status === "SUCCESS") {
        history.push({
          pathname: paths.login,
        });
      } else {
        setMessage("Coś poszło nie tak");
        setFailure(true);
      }
    }
  };

  const [role, setRole] = React.useState("Contributor");

  const [checked, setChecked] = React.useState(true);
  const handleCheckboxChange = (event) => {
    if (!event.target.checked) {
      unregister("city");
    }
    setChecked(event.target.checked);
  };

  const handleSelectChange = (event) => {
    console.log("aaaa");
    setRole(event.target.value);
    console.log(event.target.value);
    if (event.target.value === "Entrepreneur") {
      setChecked(true);
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const [disabled, setDisabled] = React.useState(false);

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
            <h3>Formularz rejestracyjny</h3>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Login"
              {...register("Username", { required: true })}
            />
            {errors.login && (
              <span>
                <br />
                Login jest wymagany
              </span>
            )}
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Hasło"
              type="password"
              {...register("Password", { required: true })}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Potwierdź Hasło"
              type="password"
              {...register("confirmPassword", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.confirmPassword && (
              <span>
                <br />
                Hasło jest wymagane
              </span>
            )}
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Imię"
              {...register("FirstName", { required: true })}
            />
            {errors.name && (
              <span>
                <br />
                Imie jest wymagane
              </span>
            )}
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Nazwisko"
              {...register("LastName", { required: true })}
            />
            {errors.surname && (
              <span>
                <br />
                Nazwisko jest wymagane
              </span>
            )}
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span>
                <br />
                Email jest wymagany
              </span>
            )}
          </Grid>
          <Grid item xs={6}>
            <Select
              {...register("role")}
              id="select-role"
              label="Rola"
              value={role}
              onChange={handleSelectChange}
              helpertext="Wybierz rolę"
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={checked}
                  onChange={handleCheckboxChange}
                  disabled={disabled}
                />
              }
              label="Adres przypisany do konta"
            />
          </Grid>
          {checked && <AddressForm register={register} errors={errors} />}
          {role === "Entrepreneur" && (
            <EntrepreneurForm
              register={register}
              errors={errors}
              // control={control}
            />
          )}
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
          {message}
        </Alert>
      </Snackbar>
    </form>
  );
};
export default Registration;
