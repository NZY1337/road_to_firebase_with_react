import React, { useState, useEffect } from "react";

import * as ROUTES from "../../constants/routes";

import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import SignOutBtn from "../SignOut";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ToggleButton from "../../utils/ToggleButton/ToggleButton";
import { makeStyles } from "@material-ui/core";
import Popover from "../../utils/Popover";

import { withFirebase } from "../Firebase";

// AuthProvider
import { AuthUserContext } from "../Sesssion";
import MenuItems from "./MenuItems";
import Logo from "./Logo";
import ProfileImage from "./ProfileImage";

const useStyles = makeStyles((theme) => ({
  bgClass1: {
    "&.MuiPaper-root": {
      backgroundColor: "rgba(0,0,0, 1)",
      transition: "background-color .5s",
    },
  },

  bgClass2: {
    "&.MuiPaper-root": {
      backgroundColor: "transparent",
      transition: "background-color .5s",
    },
  },

  header: {
    "&.MuiPaper-root": {
      padding: "1rem",
    },

    "& a": {
      textDecoration: "none",
    },

    "& .MuiTypography-root": {
      fontWeight: "bold",
    },
  },

  logo: {
    border: "2px dotted aqua",
    borderRadius: "50%",
    display: "flex",
    width: "50px",
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
}));

const Navigation = ({ firebase }) => {
  const [headerClass, setHeaderClass] = useState(false);

  const classes = useStyles();
  const [navs, setNavs] = useState([
    {
      location: ROUTES.LANDING,
      name: "Home",
      auth: false,
      id: 0,
    },
    { location: ROUTES.SIGN_UP, name: "Register", auth: false, id: 1 },
    { location: ROUTES.SIGN_IN, name: "Sign In", auth: false, id: 2 },
    { location: ROUTES.ACCOUNT, name: "Account", auth: true, id: 3 },
    {
      location: ROUTES.EDITOR,
      name: "Editor",
      auth: true,
      id: 6,
      submenu: {
        location: ROUTES.EDITOR,
        name: "Bubble",
      },
    },
    { location: ROUTES.BLOGS, name: "Blog", auth: false, id: 7 },
    { location: ROUTES.PORTFOLIO, name: "Portofoliu", auth: false, id: 8 },
    { location: ROUTES.ABOUT_US, name: "About Us", auth: false, id: 9 },
  ]);

  const authMenu = () => {
    const menu = navs.filter((nav) => nav.auth === true);

    return menu.map((nav) => {
      const { location, id, name } = nav;
      return <MenuItems name={name} location={location} id={id} />;
    });
  };

  const nonAuthMenu = () => {
    const menu = navs.filter((nav) => nav.auth === false);

    return menu.map((nav) => {
      const { location, id, name } = nav;
      return <MenuItems name={name} location={location} id={id} />;
    });
  };

  const handleScrollEvent = () => {
    window.scrollY > 50 ? setHeaderClass(true) : setHeaderClass(false);
  };

  useEffect(() => {
    handleScrollEvent();

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <AuthUserContext.Consumer>
      {(authuser) => (
        <AppBar
          elevation={headerClass ? 1 : 0}
          className={`${classes.header} ${headerClass ? classes.bgClass1 : classes.bgClass2}`}
        >
          <Container>
            <Grid container alignItems="center" justify="space-between">
              <Grid item md={1}>
                <Logo logo={classes.logo} />
              </Grid>

              <Grid item style={{ display: "flex", justifyContent: "center" }} xs={12} md={10}>
                {authuser && authMenu()}
                {nonAuthMenu()}

                {authuser && (
                  <MenuItem>
                    <SignOutBtn />
                  </MenuItem>
                )}
              </Grid>

              <Grid
                item
                md={1}
                style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", alignItems: "center" }}
              >
                <Popover toggleButton={<ToggleButton />} />
                <ProfileImage firebase={firebase} authUser={authuser} />
              </Grid>
            </Grid>
          </Container>
        </AppBar>
      )}
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(Navigation);
