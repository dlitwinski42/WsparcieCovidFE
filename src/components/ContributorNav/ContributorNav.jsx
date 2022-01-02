import React, { useContext } from "react";
import { AuthContext } from "../../store/auth";
import { useHistory } from "react-router-dom";
import { paths } from "../../strings";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const ContributorNav = () => {
  const { accessToken, signOut, role } = useContext(AuthContext);
  const history = useHistory();

  const handleList = () => {
    history.push(paths.entrepreneurList);
  };

  const handleHistory = () => {
    history.push(paths.contributorHistory);
  };

  return (
    <List>
      <ListItem button onClick={handleList}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={`Lista Przedsiębiorców`} />
      </ListItem>
      <ListItem button onClick={handleHistory}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary={`Historia Wsparcia`} />
      </ListItem>
    </List>
  );
};
export default ContributorNav;
