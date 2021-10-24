import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./animation.scss";

export default function CarouseLitemDetails({
  title,
  description,
  index,
  carouselInfo,
  postType,
  blogId,
  carouselIndex,
}) {
  const postTitle = title && title.split(" ").join("-").toLowerCase();
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    if (carouselIndex == index) {
      setInProp(true);
    }
    return () => {
      setInProp(false);
    };
  }, [carouselIndex]);

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
        <Grid item xs={12} md={8} data-number={`0.${index + 1}`} className={carouselInfo}>
          <CSSTransition in={inProp} timeout={200} classNames="carousel-title">
            <h1 className="carousel-title">{title} </h1>
          </CSSTransition>

          <p>{description}</p>

          <Link to={`${postType}/${blogId}/${postTitle}`}>
            <Button size="small" target="_blank" className="carousel-description" color="default" variant="contained">
              Read More
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
