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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminReviews = () => {
  const { accessToken, role, roleId } = useContext(AuthContext);
  const [list, setList] = useState();
  useEffect(() => getReviews(), []);
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

  const history = useHistory();

  const failReview = async (reviewId) => {
    let data = await ReviewService.failReview(reviewId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
  };

  const returnReview = async (reviewId) => {
    let data = await ReviewService.returnReview(reviewId);
    console.log(data);
    if (data.status === "SUCCESS") {
      setSuccess(true);
    } else {
      setFailure(true);
    }
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
    </>
  );
};
export default AdminReviews;
