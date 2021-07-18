import React from "react";
import Container from "@material-ui/core/Container";
import { withAuthorization } from "../Sesssion";
import "./home.css";

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
};

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Home);
