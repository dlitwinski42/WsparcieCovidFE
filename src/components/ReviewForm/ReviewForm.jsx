import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import ReviewService from "../../services/reviews";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
  };

  const [grade, setGrade] = React.useState(5);

  const handleSelectChange = (event) => {
    console.log("aaaa");
    setGrade(event.target.value);
  };
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <h3>{`Wybrano przedsiębiorstwo o nazwie ${location.state.entrepreneur.name} i id ${location.state.entrepreneur.id}`}</h3>
      <div>Review Form</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <TextField
          defaultValue="Treść recenzji"
          {...register("reviewBody", { required: true })}
        />
        {errors.reviewBody && <span>Treść recenzji jest wymagana</span>}
        <br />
        <input type="submit" />
      </form>
    </>
  );
};
export default ReviewForm;
