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
        <>
          <Grid container>
            <Container>
              <h3>Account: {authUser.email}</h3>
            </Container>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <PasswordChange />
            </Grid>
            <Grid item xs={6}>
              <PasswordForgetForm />
            </Grid>
          </Grid>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
