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

const AdminDonations = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getDonations(), []);

  const failDonation = async (donationId) => {
    let data = await DonationService.failDonation(donationId);
    console.log(data);
  };

  const returnDonation = async (donationId) => {
    let data = await DonationService.returnDonation(donationId);
    console.log(data);
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
            Usuń akcje
          </Button>{" "}
          <Button
            variant="contained"
            onClick={() => returnDonation(donation.id)}
          >
            Zwróć do przedsiębiorcy
          </Button>{" "}
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <Box>
      <h3> Zgłoszone wsparcie</h3>
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

export default AdminDonations;
