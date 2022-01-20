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

const ActiveDonations = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getDonations(), []);

  const confirmDonation = async (donationId) => {
    let data = await DonationService.confirmDonation(donationId);
    console.log(data);
  };

  const reportDonation = async (donationId) => {
    let data = await DonationService.reportDonation(donationId);
    console.log(data);
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
          {donation.dateSent}
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
    </Box>
  );
};

export default ActiveDonations;
