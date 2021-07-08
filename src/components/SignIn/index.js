import React from "react";
import { SignInForm } from "./SignInForm";
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
