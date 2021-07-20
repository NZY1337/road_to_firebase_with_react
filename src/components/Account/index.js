import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PasswordChange from "../PasswordChange";
import { PasswordForgetForm } from "../PasswordForgot/passwordForgotForm";
import { withAuthorization, AuthUserContext } from "../Sesssion";

const Account = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <Container maxWidth="lg">
          <Grid container>
            <h3>Account: {authUser.email}</h3>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <PasswordChange />
            </Grid>
            <Grid item xs={6}>
              <PasswordForgetForm />
            </Grid>
          </Grid>
        </Container>
      )}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
