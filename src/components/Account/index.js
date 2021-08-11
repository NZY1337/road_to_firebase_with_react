import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PasswordChange from "../PasswordChange";

import { withAuthorization, AuthUserContext } from "../Sesssion";

const url =
  "https://images.pexels.com/photos/3597084/pexels-photo-3597084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "multiply",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Account = () => {
  const classes = useStyles();
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <Container maxWidth="xl" className={classes.root}>
          {/* <Grid container>
            <h3>Account: {authUser.email}</h3>
          </Grid> */}

          <Grid item xl={2} lg={2} md={3} xs={12}>
            <PasswordChange />
          </Grid>
        </Container>
      )}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
