import React from "react";
import { SignInForm } from "./SignInForm";
import Container from "@material-ui/core/Container";

const SignIn = () => {
  return (
    <Container maxWidth="lg">
      <h1>Sign In</h1>
      <SignInForm />
    </Container>
  );
};

export default SignIn;
