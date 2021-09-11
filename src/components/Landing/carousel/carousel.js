import React, { useState, useEffect, useRef } from "react";
import { randomIndexBasedOnArrLen } from "../../../utils/helpers";
import { makeStyles } from "@material-ui/core";
import { withFirebase } from "../../Firebase/context";
import Skeleton from "react-loading-skeleton";
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

  const [carouselIndex, setCarouselIndex] = useState(0);

  const classes = useStyles(width);

  const [posts, setPosts] = useState(null);

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
    beforeChange: (_, prevIndex) => {
      setCarouselIndex(prevIndex);
    },

    appendDots: (dots) => {
      return (
        <div>
          <ul
            className={
              carouselIndex >= Math.floor(settings.postsLen / 2) ? classes.identifierRight : classes.identifierLeft
            }
            style={{ margin: "0 auto", width: "fit-content" }}
          >
            {dots}
          </ul>
        </div>
      );
    },
  };

  const changeDivPosition = (postsLen, index) => {
    const dotWidth = 14;
    const dotMargin = 10;
    const dotHalfWidth = dotWidth / 2; // for centering
    const totalWidthLeft =
      [Math.round(postsLen) * (dotWidth + dotMargin) - dotMargin] - [index * (dotWidth + dotMargin)] - dotHalfWidth * 2;

    const totalWidthRight =
      [Math.round(postsLen + index * (dotWidth + dotMargin)) - dotMargin + dotWidth] - dotHalfWidth;

    setWidth((prevState) => ({
      ...prevState,
      widthLeft: totalWidthLeft,
      widthRight: totalWidthRight,
    }));
  };

  useEffect(() => {
    posts && changeDivPosition(Object.keys(posts).length, carouselIndex);
  }, [carouselIndex, posts]);

  useEffect(() => {
    const blogRef = props.firebase.db.ref("blog");

    blogRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let posts = snapshot.val();
        const randomSlides = randomIndexBasedOnArrLen(posts);
        setPosts(randomSlides);
      } else {
        setPosts(null);
      }
    });
  }, []);

  const renderSlides = () => {
    return Object.keys(posts).map((id, index) => {
      const { cover, title, subtitle, description, category } = posts[id];

      return (
        <CarouselItem
          key={index}
          category={category}
          index={index}
          blogId={id}
          title={title}
          subtitle={subtitle}
          description={description}
          url={cover}
        />
      );
    });
  };

  return (
    <div style={{ height: "100vh", background: "black" }}>
      {posts && <Slider {...settings}>{renderSlides()}</Slider>}
      {!posts && <Skeleton width="100%" height="100vh" count={1} delay={1} />}
    </div>
  );
};

export default withFirebase(Carousel);
