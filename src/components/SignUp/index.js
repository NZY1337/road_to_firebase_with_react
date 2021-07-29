import React from "react";
import { SignUpForm, SignUpLink } from "./SignUpForm";
import Container from "@material-ui/core/Container";
import "./signup.scss";

const SignUpPage = () => {
  return (
    <Container
      justify="center"
      align="center"
      maxWidth="xl"
      style={{
        height: "100vh",
        backgroundImage: `url(https://images.pexels.com/photos/3380160/pexels-photo-3380160.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
        /* box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.3); */
        backgroundBlendMode: "multiply",
      }}
    >
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
