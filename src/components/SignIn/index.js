import React from "react";
import { SignInForm } from "./SignInForm";
import { PasswordForgetLink } from "../PasswordForgot/passwordForgotForm";
import { Container } from "@material-ui/core";

const url =
  "https://images.pexels.com/photos/6312362/pexels-photo-6312362.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const SignIn = () => {
  return (
    <Container
      maxWidth="xl"
      style={{
        height: "100vh",
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
        /* box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.3); */
        backgroundBlendMode: "multiply",
      }}
    >
      <SignInForm />
    </Container>
  );
};

export default SignIn;
