import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../strings";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../store/auth";
import ReviewService from "../../services/reviews";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ReviewList = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getReviews(), []);

  const location = useLocation();
  console.log(location.state);
  const history = useHistory();

  const getReviews = async () => {
    let data = await ReviewService.getReviews(location.state.entrepreneur.id);
    console.log(data);

    let array = data.data.map((review) => (
      <TableRow
        key={review.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {review.timestamp}
        </TableCell>
        <TableCell component="th" scope="row">
          {review.contributor.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {review.grade}
        </TableCell>
        <TableCell component="th" scope="row">
          {review.reviewBody}
        </TableCell>
      </TableRow>
    ));
    setList(array);
  };

  const createReview = (entrepreneur) => {
    console.log("Wystaw recenzje przedsiębiorcy " + entrepreneur.id);
    history.push({
      pathname: `${paths.reviewCreation}/${entrepreneur.id}`,
      state: { entrepreneur },
    });
  };
  return (
    <>
      <h3>{`Wybrano przedsiębiorstwo o nazwie ${location.state.entrepreneur.name} i id ${location.state.entrepreneur.id}`}</h3>
      <Button
        variant="contained"
        onClick={() => createReview(location.state.entrepreneur)}
      >
        Wystaw recenzje
      </Button>
      <div>Review List</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Ocena</TableCell>
              <TableCell align="right">Treść</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ReviewList;
