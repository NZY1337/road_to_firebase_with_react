import React from "react";
import { withAuthorization } from "../Sesssion";
import "./home.css";

const Home = () => {
  return <h1>Home</h1>;
};

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Home);
