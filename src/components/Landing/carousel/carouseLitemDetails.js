import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function CarouseLitemDetails({ title, description, index, carouselInfo, postType, blogId }) {
  const postTitle = title.split(" ").join("-").toLowerCase();

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
        <Grid item md={8} data-number={`0.${index + 1}`} className={carouselInfo}>
          <h1>{title} </h1>

          <p>{description}</p>

          <Link to={`${postType}/${blogId}/${postTitle}`}>
            <Button size="small" target="_blank" color="default" variant="contained">
              Read More
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
