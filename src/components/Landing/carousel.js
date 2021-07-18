import React from "react";

import "./styles.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Container, Grid } from "@material-ui/core";

const Carousel = (props) => {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const url1 =
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const url2 =
    "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

  const url3 =
    "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const url4 =
    "https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  return (
    <Slider {...settings}>
      <div>
        <div className="backImg" style={{ backgroundImage: `url(${url1})` }}>
          <Container maxWidth="lg">
            <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
              <h1>Design Factory</h1>
              <h2 style={{ margin: 0 }}>Part -1-</h2>
            </Grid>
          </Container>
        </div>
      </div>

      <div>
        <div className="backImg" style={{ backgroundImage: `url(${url2})` }}>
          <Container maxWidth="lg">
            <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
              <h1>Focus Club As a FullTime Job</h1>
              <h2 style={{ margin: 0 }}>Part -2-</h2>
            </Grid>
          </Container>
        </div>
      </div>

      <div>
        <div className="backImg" style={{ backgroundImage: `url(${url3})` }}>
          <Container maxWidth="lg">
            <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
              <h1>Summer Of Colors</h1>
              <h2 style={{ margin: 0 }}>Part -3-</h2>
            </Grid>
          </Container>
        </div>
      </div>

      <div>
        <div className="backImg" style={{ backgroundImage: `url(${url4})` }}>
          <Container maxWidth="lg">
            <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
              <h1>Design Factory</h1>
              <h2 style={{ margin: 0 }}>Part -4-</h2>
            </Grid>
          </Container>
        </div>
      </div>
    </Slider>
  );
};

export default Carousel;
