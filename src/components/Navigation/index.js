import React, { useState } from "react";

import * as ROUTES from "../../constants/routes";

import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SignOutBtn from "../SignOut";
import { Link } from "react-router-dom";

// AuthProvider
import { AuthUserContext } from "../Sesssion";

const style = {
  color: "#fff",
};

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  );
};

const NavigationAuth = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <MenuItem>
          <Link style={style} to={ROUTES.SIGN_IN} color="inherit">
            Sign In
          </Link>
        </MenuItem> */}

        <MenuItem>
          <Link style={style} to={ROUTES.LANDING} color="inherit">
            Landing
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={style} to={ROUTES.HOME} color="inherit">
            Home
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={style} to={ROUTES.ACCOUNT} color="inherit">
            Account
          </Link>
        </MenuItem>

        <MenuItem>
          <SignOutBtn />
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
};

const NavigationNonAuth = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuItem>
          <Link style={style} to={ROUTES.LANDING} color="inherit">
            Landing
          </Link>
        </MenuItem>

        {/* <MenuItem>
          <Link style={style} to={ROUTES.HOME} color="inherit">
            Home
          </Link>
        </MenuItem> */}

        <MenuItem>
          <Link style={style} to={ROUTES.SIGN_IN} color="inherit">
            Sign In
          </Link>
        </MenuItem>

        <MenuItem>
          <Link style={style} to={ROUTES.SIGN_UP} color="inherit">
            Register
          </Link>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
