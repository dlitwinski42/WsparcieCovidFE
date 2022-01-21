import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import OrdersService from "../../services/orders";
import { AuthContext } from "../../store/auth";
import { paths } from "../../strings";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const DeliveredOrders = () => {
  const history = useHistory();
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getOrders(), []);

  const seeOrderInfo = async (order) => {
    console.log("Zobacz szczegóły zamówienia" + order.id);
    history.push({
      pathname: `${paths.orderInfo}/${order.id}`,
      state: { order },
    });
  };

  const getOrders = async () => {
    let data = await OrdersService.getDelivered(roleId);
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
          <Button variant="contained" onClick={() => seeOrderInfo(order)}>
            Zobacz szczegóły
          </Button>
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <Box>
      <h3> Zrealizowane zamówienia</h3>
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
    </Box>
  );
};

export default DeliveredOrders;
