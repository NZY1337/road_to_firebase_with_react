import React from "react";
import Container from "@material-ui/core/Container";
import PasswordChange from "../PasswordChange";
import { PasswordForgetForm } from "../PasswordForgot/passwordForgotForm";
import { withAuthorization, AuthUserContext } from "../Sesssion";

const Account = () => {
  return (
    <Container maxWidth="lg">
      <AuthUserContext.Consumer>
        {(authUser) => (
          <>
            <h3>Account: {authUser.email}</h3>
            <PasswordChange />
            <PasswordForgetForm />
          </>
        )}
      </AuthUserContext.Consumer>
    </Container>
  );
};
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
