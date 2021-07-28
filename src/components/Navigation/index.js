import React, { useState, useEffect, useContext } from "react";

import * as ROUTES from "../../constants/routes";

import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
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
  const [navs, setNavs] = useState([
    {
      location: ROUTES.LANDING,
      name: "Landing",
      auth: false,
    },
    { location: ROUTES.SIGN_UP, name: "Sign Up", auth: false },
    { location: ROUTES.SIGN_IN, name: "Sign In", auth: false },
    { location: ROUTES.ACCOUNT, name: "Account", auth: true },
    { location: ROUTES.ADMIN, name: "Admin", auth: true },
    { location: ROUTES.PASSWORD_FORGET, name: "Password Forget", auth: true },
    { location: ROUTES.EDITOR, name: "Editor", auth: true },
    { location: ROUTES.BLOGS, name: "Blog", auth: false },
    { location: ROUTES.NEWS, name: "News", auth: false },
  ]);

  const authMenu = () => {
    const authNavs = navs.filter((nav) => nav.auth === true);

    return authNavs.map((nav) => {
      return (
        <MenuItem>
          <Link style={style} to={nav.location} color="inherit">
            {nav.name}
          </Link>
        </MenuItem>
      );
    });
  };

  const nonAuthMenu = () => {
    const authNavs = navs.filter((nav) => nav.auth === false);

    return authNavs.map((nav) => {
      return (
        <MenuItem>
          <Link style={style} to={nav.location} color="inherit">
            {nav.name}
          </Link>
        </MenuItem>
      );
    });
  };

  return (
    <AuthUserContext.Consumer>
      {(authuser) => (
        <AppBar disableGutters={true} elevation={0}>
          <Container>
            <Grid container>
              <Grid item container xs={11}>
                {authuser && authMenu()}
                {nonAuthMenu()}

                {authuser && (
                  <MenuItem>
                    <SignOutBtn />
                  </MenuItem>
                )}
              </Grid>
              <SetProfile firebase={firebase} authUser={authuser} />
            </Grid>
          </Container>
        </AppBar>
      )}
    </AuthUserContext.Consumer>
  );
};

const SetProfile = ({ firebase, authUser }) => {
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    if (authUser) {
      const userRef = firebase.db.ref("users/" + authUser.uid + "/url");
      userRef.on("value", (snapshot) => {
        const data = snapshot.val();

        setProfileImg(data);
      });
    }
  }, [authUser]);

  return (
    <Grid item xs={1} container alignItems="center" justify="flex-end">
      <MenuItem direction="row">{authUser && <img src={profileImg} style={profilePic} />}</MenuItem>
    </Grid>
  );
};

export default withFirebase(Navigation);
