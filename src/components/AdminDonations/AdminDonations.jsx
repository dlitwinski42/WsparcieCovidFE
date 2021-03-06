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

const AdminDonations = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  useEffect(() => getDonations(), []);

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

  const failDonation = async (donationId) => {
    let data = await DonationService.failDonation(donationId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
  };

  const returnDonation = async (donationId) => {
    let data = await DonationService.returnDonation(donationId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
  };

  const getDonations = async () => {
    let data = await DonationService.getReported();
    console.log(data);
    let array = data.data.map((donation) => (
      <TableRow
        key={donation.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
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
          <Button variant="contained" onClick={() => failDonation(donation.id)}>
            Usu?? akcje
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => returnDonation(donation.id)}
          >
            Zwr???? do przedsi??biorcy
          </Button>{" "}
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <Box>
      <h3> Zg??oszone wsparcie</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Kod</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Wspieraj??cy</TableCell>
              <TableCell align="right" colSpan="3">
                Akcje
              </TableCell>
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
          Operacja przebieg??a pomy??lnie!
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
          Co?? posz??o nie tak!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDonations;
