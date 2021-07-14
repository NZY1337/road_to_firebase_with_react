import React, { useState, useEffect } from "react";

import * as ROUTES from "../../constants/routes";

import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SignOutBtn from "../SignOut";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { withFirebase } from "../Firebase";

// AuthProvider
import { AuthUserContext } from "../Sesssion";

const style = {
  color: "#fff",
};

const profilePic = {
  width: "30px",
  height: "30px",
  objectFit: "cover",
  borderRadius: "50%",
};

const Navigation = ({ firebase }) => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth firebase={firebase} authUser={authUser} /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  );
};

const NavigationAuth = ({ firebase, authUser }) => {
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    const userRef = firebase.db.ref("users/" + authUser.uid + "/url");
    userRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setProfileImg(data);
    });
  }, [authUser]);

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item container xs={11}>
            <MenuItem>
              <Link style={style} to={ROUTES.LANDING} color="inherit">
                Landing
              </Link>
            </MenuItem>

            <MenuItem>
              <Link style={style} to={ROUTES.TODO} color="inherit">
                Todos
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
              <Link style={style} to={ROUTES.ADMIN} color="inherit">
                Users
              </Link>
            </MenuItem>

            <MenuItem>
              <SignOutBtn />
            </MenuItem>
          </Grid>

          <Grid item xs={1} container alignItems="center" justify="flex-end">
            <MenuItem direction="row">
              <img src={profileImg} style={profilePic} />
            </MenuItem>
          </Grid>
        </Grid>
      </Container>
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

export default withFirebase(Navigation);
