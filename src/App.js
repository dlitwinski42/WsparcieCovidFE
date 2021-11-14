import logo from "./logo.svg";
import react, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import { paths } from "./strings";
import Account from "./components/Account";
import Donation from "./components/Donation";
import Entrepreneur from "./components/Entrepreneur";
import EntrepreneurList from "./components/EntrepreneurList";
import Navbar from "./components/Navbar";
import MenuDrawer from "./components/Drawer";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { AuthContextProvider } from "./store/auth.jsx";
import "./App.css";

function App() {
  const [isDrawerOpen, openDrawer] = useState(false);
  const [isLogged, setLogged] = useState(false);

  return (
    <>
      <AuthContextProvider>
        <Box sx={{ marginLeft: isDrawerOpen ? 240 : 0 }}>
          <Navbar onClickOpenDrawer={() => openDrawer((state) => !state)} />
          <MenuDrawer open={isDrawerOpen} onClose={() => openDrawer(false)} />
          <Switch>
            <Route exact path={paths.accountView}>
              <Account />
            </Route>
            <Route exact path={paths.donationView}>
              <Donation />
            </Route>
            <Route exact path={paths.entrepreneurView}>
              <Entrepreneur />
            </Route>
            <Route exact path={paths.login}>
              <Login />
            </Route>
            <Route exact path={paths.registration}>
              <Registration />
            </Route>
            <Route exact path={paths.entrepreneurList}>
              <EntrepreneurList />
            </Route>
          </Switch>
        </Box>
      </AuthContextProvider>
    </>
  );
}

export default App;
