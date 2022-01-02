import React, { useContext, useState, useEffect } from "react";
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

const ActiveOrders = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getOrders(), []);

  const confirmOrder = async (orderId) => {
    let data = await OrdersService.confirmOrder(orderId);
    console.log(data);
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
          <Button variant="contained" onClick={() => confirmOrder(order.id)}>
            Zobacz szczegóły
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
              <TableCell align="right" colSpan="3">
                Akcje
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActiveOrders;
