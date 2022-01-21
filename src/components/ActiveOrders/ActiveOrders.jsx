import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../strings";
import OrdersService from "../../services/orders";
import { AuthContext } from "../../store/auth";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ActiveOrders = () => {
  const history = useHistory();
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [list, setList] = useState();
  useEffect(() => getOrders(), []);

  const confirmOrder = async (orderId) => {
    let data = await OrdersService.confirmOrder(orderId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else if (data.status === "ERROR") {
      setFailure(true);
    }
  };

  const failOrder = async (orderId) => {
    let data = await OrdersService.failOrder(orderId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else if (data.status === "ERROR") {
      setFailure(true);
    }
  };

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

  const seeOrderInfo = (order) => {
    console.log("Zobacz szczegóły zamówienia" + order.id);
    history.push({
      pathname: `${paths.orderInfo}/${order.id}`,
      state: { order },
    });
  };

  const getOrders = async () => {
    let data = await OrdersService.getActive(roleId);
    console.log(data);
    let array = data.data.map((order) => (
      <TableRow
        key={order.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {order.address.city} {order.address.street} {order.address.flatNumber}
          {"/"}
          {order.address.houseNumber}
          {""}
        </TableCell>
        <TableCell component="th" scope="row">
          {order.contributor.user.firstName} {order.contributor.user.lastName}
        </TableCell>
        <TableCell component="th" scope="row">
          <Button variant="contained" onClick={() => confirmOrder(order.id)}>
            Potwierdź
          </Button>{" "}
          <Button variant="contained" onClick={() => seeOrderInfo(order)}>
            Zobacz szczegóły
          </Button>{" "}
          <Button variant="contained" onClick={() => failOrder(order.id)}>
            Usuń
          </Button>
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <Box>
      <h3> Zamówienia w trakcie</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Adres</TableCell>
              <TableCell>Dane zamawiającego</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
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
          Operacja przebiegła pomyślnie!
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
    </Box>
  );
};

export default ActiveOrders;
