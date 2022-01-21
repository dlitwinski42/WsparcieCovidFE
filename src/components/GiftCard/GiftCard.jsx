import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../store/auth";
import GiftCardService from "../../services/giftcards";
import EntrepreneurService from "../../services/entrepreneurs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GiftCard = () => {
  const {
    register,
    unregister,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [code, setCode] = React.useState();
  const [bankNum, setBankNum] = React.useState(null);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState();
  const onSubmit = async (data) => {
    const formValues = {
      amount: data.amount,
      entrepreneurId: location.state.entrepreneur.id,
      contributorId: Number(roleId),
    };
    console.log(formValues);
    if (!isNaN(parseInt(formValues.amount))) {
      if (parseInt(formValues.amount) > 0) {
        const returnVal = await GiftCardService.create(formValues);
        setCode(returnVal.data.redeemCode);
        console.log(returnVal);
        if (returnVal.status == "ERROR") {
          setMessage("Coś poszło nie tak!");
          setFailure(true);
        }
      } else {
        setMessage("Wartość karty podarunkowej musi być większa od 0!");
        setFailure(true);
      }
    } else {
      setMessage("Wartość karty podarunkowej musi być liczbą!");
      setFailure(true);
    }
  };

  const handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailure(false);
  };

  const getEntrepreneur = async () => {
    if (code != null) {
      const entrepreneur = await EntrepreneurService.getSingle(
        location.state.entrepreneur.id
      );
      console.log(entrepreneur);
      setBankNum(entrepreneur.bankAccountNumber);
    }
  };

  useEffect(() => getEntrepreneur(), [code]);

  const location = useLocation();
  console.log(location.state);
  const { accessToken, role, roleId } = useContext(AuthContext);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          padding: 20,
        }}
      >
        <h3>{`Wybrano kartę podarunkową przedsiębiorstwa ${location.state.entrepreneur.name}`}</h3>
        <TextField
          defaultValue="20"
          {...register("amount", { required: true })}
        />
        <br />
        {errors.amount && <span>Wartość karty podarunkowej jest wymagana</span>}
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
        >
          {" "}
          Prześlij{" "}
        </Button>
        {bankNum && (
          <div>
            <span>Nr konta: {bankNum} </span>
            <br />
            <span>
              Prosimy w tytule przelewu wpisać frazę "Kod karty podarunkowej:{" "}
              {code}"
            </span>
          </div>
        )}
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
export default GiftCard;
