import React from "react";

import Carousel from "./carousel/carousel";
import Categories from "./category/Categories";
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
