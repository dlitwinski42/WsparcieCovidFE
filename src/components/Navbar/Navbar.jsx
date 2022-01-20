import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../store/auth";

export default function Navbar({ onClickOpenDrawer }) {
  const { accessToken, signOut, role } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onClickOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WsparcieCovid
          </Typography>
          {accessToken ? (
            <Button color="inherit" onClick={signOut}>
              Wyloguj
            </Button>
          ) : (
            <div>
              <Button href="/login" color="inherit">
                Login
              </Button>
              <Button href="/register" color="inherit">
                Rejestracja
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
