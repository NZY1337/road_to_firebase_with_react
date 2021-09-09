import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

export default function CarouseLitemDetails({ title, subtitle, description, index, carouselInfo }) {
  return (
    <Container maxWidth="lg">
      <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
        <Grid item md={8} data-number={`0.${index + 1}`} className={carouselInfo}>
          <h1>{title} </h1>
          <h2 style={{ margin: 0 }}>{subtitle}</h2>
          <p>{description}</p>

          <Button size="small" href="https://google.com" target="_blank" color="default" variant="contained">
            Read More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
