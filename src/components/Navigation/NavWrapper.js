import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import SignOutBtn from "../SignOut";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ToggleButton from "../../utils/ToggleButton/ToggleButton";
import { makeStyles } from "@material-ui/core";
import Popover from "../../utils/Popover";

// AuthProvider
import Logo from "./Logo";
import ProfileImage from "./ProfileImage";

const useStyles = makeStyles((theme) => ({
  bgClass1: {
    "&.MuiPaper-root": {
      backgroundColor: "rgba(0,0,0, .8)",
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

export function NavWrapper({ authUser, authMenu, nonAuthMenu, headerClass }) {
  const { bgClass1, bgClass2, logo, header } = useStyles();
  const addBgToNav = headerClass ? bgClass1 : bgClass2;

  return (
    <AppBar elevation={headerClass ? 1 : 0} className={`${header} ${addBgToNav}`}>
      <Container>
        <Grid container alignItems="center" justify="space-between">
          <Grid item md={1}>
            <Logo logo={logo} />
          </Grid>

          <Grid item style={{ display: "flex", justifyContent: "center" }} xs={12} md={10}>
            {authUser && authMenu()}
            {nonAuthMenu()}

            {authUser && (
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
            {/* <ProfileImage firebase={firebase} authUser={authUser} /> */}
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}

export default NavWrapper;
