import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../store/auth";
import AddressForm from "../AddressForm";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ProductsService from "../../services/products";
import ContributorsService from "../../services/contributors";
import OrdersService from "../../services/orders";

const Order = () => {
  const [list, setList] = useState();
  const [products, setProducts] = useState();
  const [contributor, setContributor] = useState({
    address: null,
  });
  const [orderId, setOrderId] = useState(null);
  const [amountInfo, setAmountInfo] = useState();
  useEffect(() => getProducts(), []);
  useEffect(() => getContributor(), []);
  useEffect(() => {
    if (orderId != null) {
      console.log("==== useEffect ====");
      console.log(orderId);
      console.log(amountInfo);
      for (const [key, value] of Object.entries(amountInfo)) {
        console.log(`${key}: ${value}`);
        if (value > 0) {
          const productFormValues = {
            orderId: orderId.data.id,
            productId: key,
            amount: value,
          };
          let productVal = ProductsService.addProduct(productFormValues);
          console.log(productVal);
        }
      }
    }
  }, [orderId]);
  const location = useLocation();
  console.log(location.state);

  const {
    register,
    unregister,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setAmountInfo(data);
    let orderFormValues = {};
    if (!contributor.address) {
      orderFormValues = {
        entrepreneurId: location.state.entrepreneur.id,
        contributorId: Number(roleId),
        city: data.city,
        street: data.street,
        houseNumber: data.houseNumber,
        flatNumber: data.flatNumber,
      };
    } else {
      orderFormValues = {
        entrepreneurId: location.state.entrepreneur.id,
        contributorId: Number(roleId),
      };
    }

    console.log("Order Form Values");
    console.log(orderFormValues);
    setOrderId(await OrdersService.create(orderFormValues));
    console.log("Order Id");
    console.log(orderId);

    // console.log(formValues);
  };

  const incrementAmount = (productId) => {
    setValue(`${productId}`, Number(getValues(`${productId}`)) + 1, {
      shouldDirty: true,
    });
  };

  const decrementAmount = (productId) => {
    if (Number(getValues(`${productId}`) != 0)) {
      setValue(
        `${productId}`,
        Number(getValues(`${productId}`) - 1, { shouldDirty: true })
      );
    }
  };

  const getContributor = async () => {
    let data = await ContributorsService.getContributor(roleId);
    console.log("CONTRIBUTOR");
    console.log(data);
    setContributor(data);
  };

  const getProducts = async () => {
    let data = await ProductsService.getProducts(
      location.state.entrepreneur.id
    );
    console.log(data.data);
    setProducts(data.data);
    // for (let i = 0; i < products.length; i++) {
    //   products[i].amount = 0;
    //   console.log(products[i]);
    // }
    console.log(products);
    console.log(data);
    let array = data.data.map((product) => (
      <TableRow
        key={product.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {product.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.description}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.price}
        </TableCell>
        <TableCell component="th" scope="row">
          <Button
            variant="contained"
            onClick={() => decrementAmount(product.id)}
          >
            -
          </Button>
          <TextField
            defaultValue={0}
            {...register(`${product.id}`, { required: true })}
          />
          <Button
            variant="contained"
            onClick={() => incrementAmount(product.id)}
          >
            +
          </Button>
        </TableCell>
      </TableRow>
    ));

    setList(array);
  };

  const { accessToken, role, roleId } = useContext(AuthContext);

  return (
    <>
      <h3>{`Wybrano przedsiębiorstwo o nazwie ${location.state.entrepreneur.name} i id ${location.state.entrepreneur.id}`}</h3>
      <div> Zamówienie </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!contributor.address && (
          <AddressForm register={register} errors={errors} />
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nazwa</TableCell>
                <TableCell>Opis</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell align="right">Ilość</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{list}</TableBody>
          </Table>
        </TableContainer>
        <input type="submit" />
      </form>
    </>
  );
};

export default Order;