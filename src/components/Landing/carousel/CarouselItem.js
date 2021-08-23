import React from "react";
import { Button, Container, Grid } from "@material-ui/core";

const CarouselItem = ({ index, url, title, subtitle, description }) => {
  console.log(typeof index);
  return (
    <div className="backImg" style={{ backgroundImage: `url(${url})` }}>
      <Container maxWidth="lg">
        <Grid container direction="column" justify="center" style={{ height: "100vh" }}>
          <Grid item md={8} data-number={`0.${index + 1}`} className="carousel-info">
            <h1>{title} </h1>
            <h2 style={{ margin: 0 }}>{subtitle}</h2>
            <p>{description}</p>

            <Button size="small" href="https://google.com" target="_blank" color="default" variant="contained">
              Read More
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CarouselItem;
