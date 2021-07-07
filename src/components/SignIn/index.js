import React from "react";
import { SignInForm } from "./SignInForm";
import Container from "@material-ui/core/Container";
import { PasswordForgetLink } from "../PasswordForgot/passwordForgotForm";

const SignIn = () => {
  return (
    <>
      <SignInForm />
      <PasswordForgetLink />
    </>
  );
};

export default SignIn;
