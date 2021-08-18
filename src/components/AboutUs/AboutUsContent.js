import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const url =
  "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function AboutUsContent({ classes, renderDataToUx }) {
  return (
    <Container maxWidth="xl" className={classes.aboutUsContainer}>
      <Container maxWidth="xl">
        <Grid container justify="space-between">
          <Grid md="3">
            <img className={classes.designImg} src={url} />

            <Typography color="aqua" variant="h4" component="h1" style={{ color: "white", marginBottom: "1rem" }}>
              esign
            </Typography>
          </Grid>

          <Grid md="8">
            <Grid container justify="space-between">
              <Grid md="4" style={{ padding: "1rem" }}>
                <Typography
                  color="primary"
                  variant="h1"
                  component="h1"
                  style={{ color: "white", marginBottom: "1rem" }}
                >
                  Our Beliefs
                </Typography>
              </Grid>

              {renderDataToUx()}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
