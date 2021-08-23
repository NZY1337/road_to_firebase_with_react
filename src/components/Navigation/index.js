import React, { useState, useEffect } from "react";

import * as ROUTES from "../../constants/routes";

import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import SignOutBtn from "../SignOut";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import logo from "../../assets/images/beadesignful-logo.png";

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
      id: 0,
    },
    { location: ROUTES.SIGN_UP, name: "Register", auth: false, id: 1 },
    { location: ROUTES.SIGN_IN, name: "Sign In", auth: false, id: 2 },
    { location: ROUTES.ACCOUNT, name: "Account", auth: true, id: 3 },
    { location: ROUTES.EDITOR, name: "Editor", auth: true, id: 6 },
    { location: ROUTES.BLOGS, name: "Blog", auth: false, id: 7 },
    { location: ROUTES.NEWS, name: "News", auth: false, id: 8 },
    { location: ROUTES.ABOUT_US, name: "About Us", auth: false, id: 9 },
  ]);

  const authMenu = () => {
    const authNavs = navs.filter((nav) => nav.auth === true);

    return authNavs.map((nav) => {
      return (
        <MenuItem key={nav.id}>
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
        <MenuItem key={nav.id}>
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
        <AppBar style={{ backgroundColor: "black" }} disablegutters="true" elevation={0}>
          <Container>
            <Grid container xs={11} alignItems="center" justify="space-between">
              <Grid item md={2}>
                <img src={logo} style={{ width: "40px", height: "40px", objectFit: "cover" }} />
              </Grid>

              <Grid item style={{ display: "flex", justifyContent: "center" }} xs={12} md={8}>
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
                md={2}
                style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", alignItems: "center" }}
              >
                <h4 style={{ marginRight: "1rem" }}>☰</h4>
                <SetProfile firebase={firebase} authUser={authuser} />
              </Grid>

              {/* <Grid item>
              </Grid> */}
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

  return authUser && <img src={profileImg} style={profilePic} />;
};

export default withFirebase(Navigation);
