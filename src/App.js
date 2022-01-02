import logo from "./logo.svg";
import react, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import { paths } from "./strings";
import Account from "./components/Account";
import Donation from "./components/Donation";
import GiftCard from "./components/GiftCard";
import Entrepreneur from "./components/Entrepreneur";
import EntrepreneurList from "./components/EntrepreneurList";
import Navbar from "./components/Navbar";
import MenuDrawer from "./components/Drawer";
import Registration from "./components/Registration";
import Login from "./components/Login";
import WhoAmI from "./components/WhoAmI";
import Order from "./components/Order";
import { AuthContextProvider } from "./store/auth.jsx";
import "./App.css";
import ProductAdd from "./components/ProductAdd";
import EntrepreneurHistory from "./components/EntrepreneurHistory";
import ContributorHistory from "./components/ContributorHistory";
import ReviewList from "./components/ReviewsList";
import ReviewForm from "./components/ReviewForm";

function App() {
  const [isDrawerOpen, openDrawer] = useState(false);
  const [isLogged, setLogged] = useState(false);

  return (
    <>
      <AuthContextProvider>
        <Box sx={{ marginLeft: isDrawerOpen ? 240 : 0 }}>
          <Navbar onClickOpenDrawer={() => openDrawer((state) => !state)} />
          <MenuDrawer open={isDrawerOpen} onClose={() => openDrawer(false)} />
          <WhoAmI />
          <Switch>
            <Route exact path={paths.accountView}>
              <Account />
            </Route>
            <Route exact path={paths.donationCreation + "/:id"}>
              <Donation />
            </Route>
            <Route exact path={paths.giftCardCreation + "/:id"}>
              <GiftCard />
            </Route>
            <Route exact path={paths.orderCreation + "/:id"}>
              <Order />
            </Route>
            <Route exact path={paths.entrepreneurView}>
              <Entrepreneur />
            </Route>
            <Route exact path={paths.addProduct}>
              <ProductAdd />
            </Route>
            <Route exact path={paths.login}>
              <Login />
            </Route>
            <Route exact path={paths.registration}>
              <Registration />
            </Route>
            <Route exact path={paths.entrepreneurHistory}>
              <EntrepreneurHistory />
            </Route>
            <Route exact path={paths.contributorHistory}>
              <ContributorHistory />
            </Route>
            <Route exact path={paths.reviewList + "/:id"}>
              <ReviewList />
            </Route>
            <Route exact path={paths.reviewCreation + "/:id"}>
              <ReviewForm />
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
