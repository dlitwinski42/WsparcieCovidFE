import react, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../strings";
import { AuthContext } from "../../store/auth";
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
  const { accessToken, signOut, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getEntrepreneur(), []);
  const history = useHistory();

  const seeReviews = (entrepreneur) => {
    console.log("Zobacz recenzje przedsiębiorcy" + entrepreneur.id);
    history.push({
      pathname: `${paths.reviewList}/${entrepreneur.id}`,
      state: { entrepreneur },
    });
  };

  const createDonation = (entrepreneur) => {
    history.push({
      pathname: `/donation/${entrepreneur.id}`,
      state: { entrepreneur },
    });
  };

  const createGiftCard = (entrepreneur) => {
    history.push({
      pathname: `/giftcard/${entrepreneur.id}`,
      state: { entrepreneur },
    });
  };

  const createOrder = (entrepreneur) => {
    history.push({
      pathname: `/order/${entrepreneur.id}`,
      state: { entrepreneur },
    });
  };

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
        {role === "Contributor" && (
          <TableCell component="th" scope="row">
            {" "}
            {entrepreneur.supportMethods ? (
              entrepreneur.supportMethods.canDonate ? (
                // <Link
                //   to={{
                //     pathname: `/donation/${entrepreneur.id}`,
                //     state: { entrepreneur },
                //   }}
                // >
                //   {" "}
                //   <Button variant="contained">Wesprzyj</Button>{" "}
                // </Link>
                <Button
                  variant="contained"
                  onClick={() => createDonation(entrepreneur)}
                >
                  Wesprzyj
                </Button>
              ) : (
                ""
              )
            ) : (
              ""
            )}{" "}
            {entrepreneur.supportMethods ? (
              entrepreneur.supportMethods.canGiftCard ? (
                // <Link
                //   to={{
                //     pathname: `/giftcard/${entrepreneur.id}`,
                //     state: { entrepreneur },
                //   }}
                // >
                //   {" "}
                //   <Button variant="contained">Karty Podarunkowe</Button>{" "}
                // </Link>
                <Button
                  variant="contained"
                  onClick={() => createGiftCard(entrepreneur)}
                >
                  Karta Podarunkowa
                </Button>
              ) : (
                ""
              )
            ) : (
              ""
            )}{" "}
            {entrepreneur.supportMethods ? (
              entrepreneur.supportMethods.canOrder ? (
                // <Link
                //   to={{
                //     pathname: `/order/${entrepreneur.id}`,
                //     state: { entrepreneur },
                //   }}
                // >
                //   {" "}
                //   <Button variant="contained">Zamów</Button>{" "}
                // </Link>
                <Button
                  variant="contained"
                  onClick={() => createOrder(entrepreneur)}
                >
                  Zamów
                </Button>
              ) : (
                ""
              )
            ) : (
              ""
            )}{" "}
          </TableCell>
        )}

        <TableCell>
          <Button variant="contained" onClick={() => seeReviews(entrepreneur)}>
            Zobacz Recenzje
          </Button>
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  return (
    <div>
      <h1> Lista Przedsiębiorców </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell>Adres</TableCell>
              <TableCell>Opis</TableCell>
              {role === "Contributor" && <TableCell>Formy Wsparcia</TableCell>}

              <TableCell>Recenzje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EntrepreneurList;
