import React from "react";

import Carousel from "./carousel";
import Categories from "./Categories";
import AboutUsPreview from "../AboutUs/AboutUsPreview";

const Landing = () => {
  return (
    <>
      <Carousel />
      <Categories />
      <AboutUsPreview />
    </>
  );
};

export default Landing;
