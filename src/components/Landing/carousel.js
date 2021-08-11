import React from "react";

import "./styles.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Container, Grid } from "@material-ui/core";

const Carousel = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const url1 =
    "https://images.pexels.com/photos/7018391/pexels-photo-7018391.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const url2 =
    "https://images.pexels.com/photos/7018257/pexels-photo-7018257.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

  const url3 =
    "https://images.pexels.com/photos/337897/pexels-photo-337897.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const url4 =
    "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  return (
    <Slider {...settings}>
      <div>
        <div className="backImg" style={{ backgroundImage: `url(${url1})` }}>
          <Container maxWidth="lg">
            <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
              <Grid item md={6} data-number="0.1" className="carousel-info">
                <h1>Design Factory</h1>
                <h2 style={{ margin: 0 }}>Luxury</h2>
                <p>
                  The basic write operation through the REST API is PUT. To demonstrate saving data, we'll build a
                  blogging application with posts and users.
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>

      <div>
        <div className="backImg" style={{ backgroundImage: `url(${url2})` }}>
          <Container maxWidth="lg">
            <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
              <Grid item md={8} data-number="0.2" className="carousel-info">
                <h1>Focus Club As a FullTime Job</h1>
                <h2 style={{ margin: 0 }}>Key Binding</h2>
                <p>
                  So far, Carrie has been delivering chic New Yorker style, Miranda sleek pant looks, and Charlotte
                  elegant (and uptown-worthy) day dresses. All that’s missing is Kim Cattrall in her signature Samantha
                  power suits, and the original
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>

      <div>
        <div className="backImg" style={{ backgroundImage: `url(${url3})` }}>
          <Container maxWidth="lg">
            <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
              <Grid item md={8} data-number="0.3" className="carousel-info">
                <h1>All White</h1>
                <h2 style={{ margin: 0 }}>The Proposal</h2>
                <p>
                  One of the first pieces we saw make a return was Carrie’s wide, studded black leather belt by Streets
                  Ahead. In the new reboot, Carrie wears it with a pink Carolina Herrera shirtdress and black pumps;
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>

      <div>
        <div className="backImg" style={{ backgroundImage: `url(${url4})` }}>
          <Container maxWidth="lg">
            <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
              <Grid item md={8} data-number="0.4" className="carousel-info">
                <h1>Design Factory </h1>
                <h2 style={{ margin: 0 }}>Interlude</h2>
                <p>
                  So keep your eyes peeled for even more pieces to be revived, because something tells us Carrie’s 2021
                  style mantra is all about up-cycling and re-wearing.
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </Slider>
  );
};

export default Carousel;
