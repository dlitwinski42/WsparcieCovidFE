/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState, useEffect } from "react";
import GiftCardService from "../../services/giftcards";
import { AuthContext } from "../../store/auth";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const UsedGiftCards = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getGiftCards(), []);

  const getGiftCards = async () => {
    let data = await GiftCardService.getUsed(roleId);
    console.log(data);
    let array = data.data.map((giftcard) => (
      <TableRow
        key={giftcard.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {giftcard.timePaid.substring(0, 19).replace(/T/g, " ")}
        </TableCell>
        <TableCell component="th" scope="row">
          {giftcard.amount}
        </TableCell>
        <TableCell component="th" scope="row">
          {giftcard.contributor.user.firstName}{" "}
          {giftcard.contributor.user.lastName}
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <Box>
      <h3> Karty Podarunkowe </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data Wykorzystania</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Wspierający</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsedGiftCards;
