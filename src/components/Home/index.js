import React from "react";
import Container from "@material-ui/core/Container";
import { withAuthorization } from "../Sesssion";

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
};

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Home);
