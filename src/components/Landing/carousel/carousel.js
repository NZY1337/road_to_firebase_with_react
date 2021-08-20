import React, { useState, useEffect, useRef } from "react";
import { randomIndexBasedOnArrLen } from "../../../utils/helpers";
import { makeStyles } from "@material-ui/core";

import CarouselItem from "./CarouselItem";

import "../styles.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme) => ({
  identifierLeft: {
    "& .slick-active": {
      "&::after": {
        position: "absolute",
        content: "''",
        width: (width) => width.widthLeft,
        height: "10px",
        top: "-20px",
        bottom: 0,
        left: "-4px", // - margin
        borderLeft: "2px solid red",
        borderTop: "2px solid red",
        borderRight: 0,
        borderBottom: 0,
        marginLeft: "10px",
      },
    },
  },

  identifierRight: {
    "& .slick-active": {
      "&::after": {
        position: "absolute",
        content: "''",
        width: (width) => width.widthRight,
        height: "10px",
        top: "-20px",
        bottom: 0,
        right: "4px", // - margin
        borderLeft: 0,
        borderTop: "2px solid red",
        borderRight: "2px solid red",
        borderBottom: 0,
        marginLeft: 0,
      },
    },
  },
}));

const Carousel = (props) => {
  const objRef = useRef({
    widthLeft: null,
    widthRight: null,
  });

  const classes = useStyles(objRef.current);
  const [index, setIndex] = useState(null);

  const [slides, setSlides] = useState([
    {
      url: "https://images.pexels.com/photos/7018391/pexels-photo-7018391.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "All Seasons",
      id: 0,
      subtitle: "Luxury",
      description:
        "The basic write operation through the REST API is PUT. To demonstrate saving data, we'll build a blogging application with posts and users.",
    },

    {
      url: "https://images.pexels.com/photos/7018257/pexels-photo-7018257.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Focus Club As a FullTime Job",
      id: 1,
      subtitle: "Key Binding",
      description:
        "So far, Carrie has been delivering chic New Yorker style, Miranda sleek pant looks, and Charlotte elegant (and uptown-worthy) day dresses. All that’s missing is Kim Cattrall in her signature Samantha power suits, and the original",
    },

    {
      url: "https://images.pexels.com/photos/337897/pexels-photo-337897.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "All White",
      id: 2,
      subtitle: "The Proposal",
      description:
        "One of the first pieces we saw make a return was Carrie’s wide, studded black leather belt by Streets Ahead. In the new reboot, Carrie wears it with a pink Carolina Herrera shirtdress and black pumps;",
    },
    {
      url: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Design Factory",
      id: 3,
      subtitle: "Interlude",
      description:
        "So keep your eyes peeled for even more pieces to be revived, because something tells us Carrie’s 2021 style mantra.",
    },

    {
      url: "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Blue Lagoon",
      id: 4,
      subtitle: "Awesome Bedroom",
      description:
        "check stats again... i already wrote chrome is slower beacuse they optimized Math, on all other the bitwise floor and while is faster. ",
    },
    {
      url: "https://images.pexels.com/photos/3044536/pexels-photo-3044536.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Amanta's Love Affair",
      id: 5,
      subtitle: "Out Of Your League",
      description:
        "Some solutions on this page aren't reliable (they only partially randomise the array). Other solutions are significantly less efficient. ",
    },

    {
      url: "https://images.pexels.com/photos/1029803/pexels-photo-1029803.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Business Intelectuals",
      id: 6,
      subtitle: "My Turn",
      description: "Checks if the current environment matches a given media query and returns the appropriate value.",
    },

    {
      url: "https://images.pexels.com/photos/1770808/pexels-photo-1770808.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Road To Valhalla",
      id: 7,
      subtitle: "Hell's Road",
      description: "Photo by Jess Loiterton. The best free stock photos & videos shared by talented creators.",
    },

    {
      url: "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Dark Chambers",
      id: 8,
      subtitle: "All Black",
      description: "Photo by Jess Loiterton. The best free stock photos & videos shared by talented creators.",
    },
  ]);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    beforeChange: (_, next) => {
      setIndex(next);
    },

    appendDots: (dots) => (
      <div>
        <ul
          className={index > Math.floor(slides.length / 2) ? classes.identifierRight : classes.identifierLeft}
          style={{ margin: "0 auto", width: "fit-content" }}
        >
          {dots}
        </ul>
      </div>
    ),
  };
  const decideWhichIdentifierStyle = () => {
    //! don't try to understand this algorithm, I barely understand it for myself; BUT IT WOKRS as intended
    const dotWidth = 14;
    const dotMargin = 10;
    const totalWidthLeft =
      [Math.round(slides.length) * (dotWidth + dotMargin) - dotMargin] - [index * (dotWidth + dotMargin)] - 7;

    const totalWidthRight = [Math.round(slides.length + index * (dotWidth + dotMargin)) - dotMargin + dotWidth] - 7;

    objRef.current.widthLeft = totalWidthLeft;
    objRef.current.widthRight = totalWidthRight;
  };

  useEffect(() => {
    const randomSlides = randomIndexBasedOnArrLen(slides);
    setSlides(randomSlides);
    decideWhichIdentifierStyle();
  }, [index]);

  const renderSlides = () => {
    return slides.map((slide, index) => {
      const { url, title, subtitle, description } = slide;
      return <CarouselItem index={slide.id} title={title} subtitle={subtitle} description={description} url={url} />;
    });
  };

  return <Slider {...settings}>{renderSlides()}</Slider>;
};

export default Carousel;
