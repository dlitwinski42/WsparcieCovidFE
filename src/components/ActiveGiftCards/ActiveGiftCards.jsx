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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ActiveGiftCards = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getGiftCards(), []);
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

  const confirmGiftCard = async (giftcardId) => {
    let data = await GiftCardService.confirmGiftCard(giftcardId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
  };

  const reportGiftCard = async (giftcardId) => {
    let data = await GiftCardService.reportGiftCard(giftcardId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
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
          {giftcard.timeOrdered.substring(0, 19).replace(/T/g, " ")}
        </TableCell>
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
          <Button
            variant="contained"
            onClick={() => reportGiftCard(giftcard.id)}
          >
            Zgłoś
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
              <TableCell>Data</TableCell>
              <TableCell>Kod</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Wspierający</TableCell>
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

export default ActiveGiftCards;
