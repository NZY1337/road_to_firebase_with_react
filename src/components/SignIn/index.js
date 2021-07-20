import React from "react";
import { SignInForm } from "./SignInForm";
import { PasswordForgetLink } from "../PasswordForgot/passwordForgotForm";
import { Container } from "@material-ui/core";

const SignIn = () => {
  return (
    <Container maxWidth="lg">
      <SignInForm />
      <PasswordForgetLink />
    </Container>
  );
};

export default SignIn;
