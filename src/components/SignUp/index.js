import React from "react";
import { SignUpForm, SignUpLink } from "./SignUpForm";

import Container from "@material-ui/core/Container";

const SignUpPage = () => {
  return (
    <Container maxWidth="lg">
      <h1>SignUp</h1>

      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
