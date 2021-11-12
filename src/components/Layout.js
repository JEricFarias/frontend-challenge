import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  makeStyles,
  Container,
  useTheme,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import gofindLogo from "../assets/logo.png";
import OverrideButton from "./OverrideButton";

const useStyles = makeStyles((theme) => {
  return {
    logo: {
      height: 60,
      margin: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    container: {
      marginTop: theme.spacing(5),
      minWidth: theme.breakpoints.values.sm,
    },
  };
});

function Layout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Box className={classes.logo} component="img" src={gofindLogo} />
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      <Container className={classes.container}>
        {/* botão de back home */}
        {location.pathname !== "/" ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            <OverrideButton
              label="Home"
              icon={<ArrowBack />}
              style={{ marginBottom: theme.spacing(4) }}
            />
          </Link>
        ) : null}
        {children}
      </Container>
    </>
  );
}

export default Layout;
