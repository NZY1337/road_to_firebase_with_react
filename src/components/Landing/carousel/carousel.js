import React, { useState, useEffect, useRef } from "react";
import { randomIndexBasedOnArrLen } from "../../../utils/helpers";
import { makeStyles } from "@material-ui/core";
import { withFirebase } from "../../Firebase/context";

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
        width: (w) => Number(w.widthLeft),
        height: "10px",
        top: "-20px",
        bottom: 0,
        left: "7px", // - margin
        borderLeft: "2px solid red",
        borderTop: "2px solid red",
        borderRight: 0,
        borderBottom: 0,
      },
    },
  },

  identifierRight: {
    "& .slick-active": {
      "&::after": {
        position: "absolute",
        content: "''",
        width: (w) => Number(w.widthRight),
        height: "10px",
        top: "-20px",
        bottom: 0,
        right: "7px", // - margin
        borderLeft: 0,
        borderTop: "2px solid red",
        borderRight: "2px solid red",
        borderBottom: 0,
      },
    },
  },
}));

const Carousel = (props) => {
  const [width, setWidth] = useState({
    widthLeft: 0,
    widthRight: 0,
  });

  const classes = useStyles(width);

  const [index, setIndex] = useState(0);
  const [posts, setPosts] = useState({});

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    fade: true,
    postsLen: posts && Object.keys(posts).length,
    currentIndex: null,
    beforeChange: (oldIndex, prevIndex) => {
      setIndex(prevIndex);
      decideWhichIdentifierStyle(settings.postsLen, prevIndex);
    },

    appendDots: (dots) => {
      return (
        <div>
          <ul
            className={index >= Math.floor(settings.postsLen / 2) ? classes.identifierRight : classes.identifierLeft}
            style={{ margin: "0 auto", width: "fit-content" }}
          >
            {dots}
          </ul>
        </div>
      );
    },
  };

  const decideWhichIdentifierStyle = (postsLen, index) => {
    const dotWidth = 14;
    const dotMargin = 10;
    const dotHalfWidth = dotWidth / 2; // for centering
    const totalWidthLeft =
      [Math.round(postsLen) * (dotWidth + dotMargin) - dotMargin] - [index * (dotWidth + dotMargin)] - dotHalfWidth;

    const totalWidthRight =
      [Math.round(postsLen + index * (dotWidth + dotMargin)) - dotMargin + dotWidth] - dotHalfWidth;

    setWidth((prevState) => ({
      ...prevState,
      widthLeft: totalWidthLeft,
      widthRight: totalWidthRight,
    }));
  };

  useEffect(() => {
    const blogRef = props.firebase.db.ref("blog");

    blogRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let posts = snapshot.val();
        const randomSlides = randomIndexBasedOnArrLen(posts);
        setPosts(randomSlides);
        decideWhichIdentifierStyle(Object.keys(posts).length, index);
      } else {
        setPosts({});
      }
    });
  }, []);

  const renderSlides = () => {
    return Object.keys(posts).map((post, index) => {
      const { cover, title, subtitle, description } = posts[post];

      return (
        <CarouselItem
          key={index}
          index={index}
          title={title}
          subtitle={subtitle}
          description={description}
          //   url={cover}
        />
      );
    });
  };

  return <>{posts && <Slider {...settings}>{renderSlides()}</Slider>}</>;
};

export default withFirebase(Carousel);
