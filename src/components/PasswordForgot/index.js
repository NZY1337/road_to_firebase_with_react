import React, { Component } from "react";
import { PasswordForgetForm, PasswordForgetLink } from "./passwordForgotForm";
import { Container } from "@material-ui/core";

const PasswordForgetPage = () => {
  return (
    <Container maxWidth="lg">
      <PasswordForgetForm />
    </Container>
  );
};

export default PasswordForgetPage;
