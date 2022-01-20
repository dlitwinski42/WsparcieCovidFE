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

const AdminReviews = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getReviews(), []);

  const history = useHistory();

  const failReview = async (reviewId) => {
    let data = await ReviewService.failReview(reviewId);
    console.log(data);
  };

  const returnReview = async (reviewId) => {
    let data = await ReviewService.returnReview(reviewId);
    console.log(data);
  };

  const getReviews = async () => {
    let data = await ReviewService.getReported();
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
        <Button variant="contained" onClick={() => failReview(review.id)}>
          Usuń akcje
        </Button>{" "}
        <Button variant="contained" onClick={() => returnReview(review.id)}>
          Zwróc do przedsiębiorcy
        </Button>{" "}
      </TableRow>
    ));
    setList(array);
  };

  return (
    <>
      <h3>Zgłoszone Recenzje</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Ocena</TableCell>
              <TableCell>Treść</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AdminReviews;
