import React, { useContext, useState, useEffect } from "react";
import DonationService from "../../services/donations";
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

const ActiveDonations = (fireSuccess, fireFailure) => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getDonations(), []);
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

  const confirmDonation = async (donationId) => {
    let data = await DonationService.confirmDonation(donationId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
  };

  const reportDonation = async (donationId) => {
    let data = await DonationService.reportDonation(donationId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
  };

  const getDonations = async () => {
    let data = await DonationService.getDonations(roleId);
    console.log(data);
    let array = data.data.map((donation) => (
      <TableRow
        key={donation.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {donation.dateSent.substring(0, 19).replace(/T/g, " ")}
        </TableCell>
        <TableCell component="th" scope="row">
          {donation.donationCode}
        </TableCell>
        <TableCell component="th" scope="row">
          {donation.amount}
        </TableCell>
        <TableCell component="th" scope="row">
          {donation.contributor.user.firstName}{" "}
          {donation.contributor.user.lastName}
        </TableCell>
        <TableCell component="th" scope="row">
          <Button
            variant="contained"
            onClick={() => confirmDonation(donation.id)}
          >
            Potwierdź
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => reportDonation(donation.id)}
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
      <h3> Wsparcie wymagające potwierdzenia</h3>
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

export default ActiveDonations;
