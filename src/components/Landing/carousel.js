import React, { useState, useEffect } from "react";

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

  const [slides, setSlides] = useState([
    {
      url: "https://images.pexels.com/photos/7018391/pexels-photo-7018391.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Design Factory",
      subtitle: "Luxury",
      description:
        "The basic write operation through the REST API is PUT. To demonstrate saving data, we'll build a blogging application with posts and users.",
    },
    {
      url: "https://images.pexels.com/photos/7018257/pexels-photo-7018257.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Focus Club As a FullTime Job",
      subtitle: "Key Binding",
      description:
        "So far, Carrie has been delivering chic New Yorker style, Miranda sleek pant looks, and Charlotte elegant (and uptown-worthy) day dresses. All that’s missing is Kim Cattrall in her signature Samantha power suits, and the original",
    },
    {
      url: "https://images.pexels.com/photos/337897/pexels-photo-337897.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "All White",
      subtitle: "The Proposal",
      description:
        "One of the first pieces we saw make a return was Carrie’s wide, studded black leather belt by Streets Ahead. In the new reboot, Carrie wears it with a pink Carolina Herrera shirtdress and black pumps;",
    },
    {
      url: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Design Factory",
      subtitle: "Interlude",
      description:
        "So keep your eyes peeled for even more pieces to be revived, because something tells us Carrie’s 2021 style mantra is all about up-cycling and re-wearing.",
    },
  ]);

  const url4 =
    "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const renderSlides = () => {
    return slides.map((slide, index) => {
      const { url, title, subtitle, description } = slide;
      return (
        <div>
          <div className="backImg" style={{ backgroundImage: `url(${url})` }}>
            <Container maxWidth="lg">
              <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
                <Grid item md={8} data-number={`0.${index + 1}`} className="carousel-info">
                  <h1>{title} </h1>
                  <h2 style={{ margin: 0 }}>{subtitle}</h2>
                  <p>|{description}</p>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      );
    });
  };

  return <Slider {...settings}>{renderSlides()}</Slider>;
};

export default Carousel;
