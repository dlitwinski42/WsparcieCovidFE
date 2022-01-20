import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrdersService from "../../services/orders";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const OrderInfo = () => {
  const location = useLocation();
  console.log(location.state);
  const [list, setList] = useState();

  useEffect(() => getOrder(), []);
  const getOrder = async () => {
    let data = await OrdersService.getOrderInfo(location.state.order.id);
    console.log(data);

    let array = data.data.orderProducts.map((product) => (
      <TableRow
        key={product.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {product.amount}
        </TableCell>
        <TableCell component="th" scope="row">
          {product.product.name}
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <>
      <div>Order Info</div>;
      <Box>
        <h3> Szczegóły zamówienia</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ilość</TableCell>
                <TableCell>Produkt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{list}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default OrderInfo;
