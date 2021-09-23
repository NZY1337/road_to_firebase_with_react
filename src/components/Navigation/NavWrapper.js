import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import SignOutBtn from "../SignOut";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ToggleButton from "../../utils/ToggleButton/ToggleButton";
import Popover from "../../utils/Popover";

// AuthProvider
import Logo from "./Logo";
import ProfileImage from "./ProfileImage";

export function NavWrapper({ headerClass, classes, authUser, authMenu, nonAuthMenu, firebase }) {
  const { bgClass1, bgClass2, logo } = classes;
  const addBgToNav = headerClass ? bgClass1 : bgClass2;

  return (
    <AppBar elevation={headerClass ? 1 : 0} className={`${classes.header} ${addBgToNav}`}>
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
