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

const ActiveGiftCards = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getGiftCards(), []);

  const confirmGiftCard = async (giftcardId) => {
    let data = await GiftCardService.confirmGiftCard(giftcardId);
    console.log(data);
  };

  const getGiftCards = async () => {
    let data = await GiftCardService.getActive(roleId);
    console.log(data);
    let array = data.data.map((giftcard) => (
      <TableRow
        key={giftcard.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {giftcard.redeemCode}
        </TableCell>
        <TableCell component="th" scope="row">
          {giftcard.amount}
        </TableCell>
        <TableCell component="th" scope="row">
          {giftcard.contributor.user.firstName}{" "}
          {giftcard.contributor.user.lastName}
        </TableCell>
        <TableCell component="th" scope="row">
          <Button
            variant="contained"
            onClick={() => confirmGiftCard(giftcard.id)}
          >
            Potwierdź
          </Button>{" "}
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <Box>
      <h3> Karty Podarunkowe wymagające potwierdzenia </h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Kod</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Wspierający</TableCell>
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

export default ActiveGiftCards;
