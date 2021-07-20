import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Carousel from "./carousel";
import Categories from "./Categories";

const Landing = () => {
  return (
    <>
      <Carousel />
      <Categories />
    </>
  );
};

export default Landing;
