import React, { useState, useContext } from "react";
import { AuthContext } from "../../store/auth";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import ReviewService from "../../services/reviews";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReviewForm = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);

  const {
    register,
    unregister,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formValues = {
      contributorId: Number(roleId),
      entrepreneurId: location.state.entrepreneur.id,
      grade: data.grade,
      reviewBody: data.reviewBody,
    };
    console.log(formValues);
    const returnVal = await ReviewService.create(formValues);
    console.log(returnVal);
    if (returnVal.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
  };

  const [grade, setGrade] = React.useState(5);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

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

  const handleSelectChange = (event) => {
    console.log("aaaa");
    setGrade(event.target.value);
  };
  const location = useLocation();
  console.log(location.state);
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
            <h3>{`Recenzja przedsiębiorstwa ${location.state.entrepreneur.name}`}</h3>
          </Grid>
          <Grid item xs={2}>
            Ocena
            <br />
            <Select
              {...register("grade")}
              id="grade"
              label="Ocena"
              value={grade}
              onChange={handleSelectChange}
              helpertext="Wybierz ocenę"
            >
              <MenuItem key={1} value={1}>
                {1}
              </MenuItem>
              <MenuItem key={2} value={2}>
                {2}
              </MenuItem>
              <MenuItem key={3} value={3}>
                {3}
              </MenuItem>
              <MenuItem key={4} value={4}>
                {4}
              </MenuItem>
              <MenuItem key={5} value={5}>
                {5}
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Treść recenzji"
              multiline
              rows={5}
              style={{ width: "90%" }}
              {...register("reviewBody", { required: true })}
            />
            {errors.reviewBody && <span>Treść recenzji jest wymagana</span>}
          </Grid>
          <Grid item xs={6}>
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
        open={success}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Pomyślnie dodano recenzje!
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
          Coś poszło nie tak!
        </Alert>
      </Snackbar>
    </form>
  );
};
export default ReviewForm;
