import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import ProductsService from "../../services/products";

const ProductAdd = () => {
  const {
    register,
    unregister,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { accessToken, signOut, roleId } = useContext(AuthContext);
  const onSubmit = async (data) => {
    console.log(data);
    const formValues = {
      price: data.price,
      name: data.name,
      description: data.description,
      entrepreneurId: Number(roleId),
    };
    const returnVal = await ProductsService.create(formValues);
    console.log(returnVal);
  };

  return (
    <Box>
      Product Addition
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue="20"
          {...register("price", { required: true })}
        />
        <br />
        {errors.price && <span>Cena jest wymagana</span>}
        <TextField
          defaultValue="Nazwa"
          {...register("name", { required: true })}
        />
        <br />
        {errors.name && <span>Nazwa jest wymagana</span>}
        <TextField
          defaultValue="Opis"
          {...register("description", { required: true })}
        />
        <br />
        {errors.description && <span>Opis jest wymagany</span>}
        <input type="submit" />
      </form>
    </Box>
  );
};
export default ProductAdd;
