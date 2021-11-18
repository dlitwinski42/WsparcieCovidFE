import React from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddressForm from "../AddressForm";
import EntrepreneurForm from "../EntrepreneurForm";
import MenuItem from "@mui/material/MenuItem";
import AuthService from "../../services/auth";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

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

const Registration = () => {
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
  const onSubmit = async (data) => {
    console.log(data);
    const returnVal = await AuthService.create(data);
  };

  const [role, setRole] = React.useState("Entrepreneur");

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
      {/* register your input into the hook by invoking the "register" function */}
      Login
      <TextField
        defaultValue="Login"
        {...register("Username", { required: true })}
      />
      {errors.login && <span>Login jest wymagany</span>}
      <br />
      {/* include validation with required or other standard HTML validation rules */}
      Hasło
      <TextField
        type="password"
        {...register("Password", { required: true })}
      />
      <br />
      Potwierdź hasło
      <TextField
        type="password"
        {...register("confirmPassword", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.confirmPassword && <span>Hasło jest wymagane</span>}
      <br />
      Imię
      <TextField
        defaultValue="Jan"
        {...register("FirstName", { required: true })}
      />
      {errors.name && <span>Imie jest wymagane</span>}
      <br />
      Nazwisko
      <TextField
        defaultValue="Kowalski"
        {...register("LastName", { required: true })}
      />
      {errors.surname && <span>Nazwisko jest wymagane</span>}
      <br />
      Email
      <TextField
        defaultValue="Email"
        {...register("email", { required: true })}
      />
      {errors.email && <span>Email jest wymagany</span>}
      <br />
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
      <br />
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
      {checked && <AddressForm register={register} errors={errors} />}
      {role === "Entrepreneur" && (
        <EntrepreneurForm
          register={register}
          errors={errors}
          // control={control}
        />
      )}
      <input type="submit" />
    </form>
  );
};
export default Registration;
