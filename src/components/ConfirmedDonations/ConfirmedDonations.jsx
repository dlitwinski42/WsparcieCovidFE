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

const ConfirmedDonations = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getDonations(), []);

  const getDonations = async () => {
    let data = await DonationService.getConfirmed(roleId);
    console.log(data);
    let array = data.data.map((donation) => (
      <TableRow
        key={donation.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {donation.dateConfirmed.substring(0, 19).replace(/T/g, " ")}
        </TableCell>
        <TableCell component="th" scope="row">
          {donation.amount}
        </TableCell>
        <TableCell component="th" scope="row">
          {donation.contributor.user.firstName}{" "}
          {donation.contributor.user.lastName}
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <Box>
      <h3> Bezpośrednie wsparcie</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data Potwierdzenia</TableCell>
              <TableCell>Kwota</TableCell>
              <TableCell>Wspierający</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ConfirmedDonations;
