import react, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import EntrepreneurService from "../../services/entrepreneurs";

const EntrepreneurList = () => {
  const [list, setList] = useState();
  useEffect(() => getEntrepreneur(), []);

  const getEntrepreneur = async () => {
    let data = await EntrepreneurService.getEntrepreneur();
    console.log(data);
    let array = data.map((entrepreneur) => (
      <TableRow
        key={entrepreneur.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {entrepreneur.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {entrepreneur.address ? entrepreneur.address.city : ""}{" "}
          {entrepreneur.address ? entrepreneur.address.street : ""}{" "}
          {entrepreneur.address ? entrepreneur.address.houseNumber : ""}/
          {entrepreneur.address ? entrepreneur.address.flatNumber : ""}
        </TableCell>
        <TableCell component="th" scope="row">
          {entrepreneur.description ? entrepreneur.description : ""}{" "}
        </TableCell>
        <TableCell component="th" scope="row">
          Donation:{" "}
          {entrepreneur.supportMethods ? (
            entrepreneur.supportMethods.canDonate ? (
              <Link
                to={{
                  pathname: `/donation/${entrepreneur.id}`,
                  state: { entrepreneur },
                }}
              >
                {" "}
                <Button variant="contained">Wesprzyj</Button>{" "}
              </Link>
            ) : (
              "false"
            )
          ) : (
            ""
          )}{" "}
          GiftCard:{" "}
          {entrepreneur.supportMethods ? (
            entrepreneur.supportMethods.canGiftCard ? (
              <Link
                to={{
                  pathname: `/giftcard/${entrepreneur.id}`,
                  state: { entrepreneur },
                }}
              >
                {" "}
                <Button variant="contained">Karty Podarunkowe</Button>{" "}
              </Link>
            ) : (
              "false"
            )
          ) : (
            ""
          )}{" "}
          Zamówienie:
          {entrepreneur.supportMethods ? (
            entrepreneur.supportMethods.canOrder ? (
              <Link
                to={{
                  pathname: `/order/${entrepreneur.id}`,
                  state: { entrepreneur },
                }}
              >
                {" "}
                <Button variant="contained">Zamów</Button>{" "}
              </Link>
            ) : (
              "false"
            )
          ) : (
            ""
          )}{" "}
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nazwa</TableCell>
            <TableCell>Adres</TableCell>
            <TableCell>Opis</TableCell>
            <TableCell align="right" colSpan="3">
              Formy Wsparcia
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{list}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default EntrepreneurList;
