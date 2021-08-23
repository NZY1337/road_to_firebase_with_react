import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormatQuote from "@material-ui/icons/FormatQuote";

const url =
  //   "https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  "https://images.pexels.com/photos/2130475/pexels-photo-2130475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
//   "https://images.pexels.com/photos/2089891/pexels-photo-2089891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

export default function AboutUsContent({ classes, renderDataToUx }) {
  const { picDescription, picDescriptionContainer, aboutUsContainer, designImg } = classes;
  return (
      
    <Container maxWidth="xl" className={aboutUsContainer}>
      <Container maxWidth="xl" style={{ marginTop: "5rem" }}>
        <Grid container justify="space-between">
          <Grid md="3" style={{ position: "relative", alignSelf: "baseline" }} className={picDescriptionContainer}>
            <img className={designImg} src={url} />

            <Typography
              className={picDescription}
              variant="h4"
              component="h1"
              style={{ color: "lightgray", marginBottom: "1rem" }}
            >
              Design your ideas with us.
            </Typography>
          </Grid>

          <Grid md="8">
            <Grid container justify="space-between">
              <Grid md="5" style={{ textAlign: "right" }}>
                <FormatQuote style={{ color: "#f50057", fontSize: "3rem" }} />

                <Typography
                  color="primary"
                  variant="h3"
                  component="h1"
                  style={{
                    color: "white",
                    marginBottom: "1rem",
                    background: "-webkit-linear-gradient(#eee, gray)",
                    background: "-moz-linear-gradient(#eee, gray)",
                    background: "linear-gradient(#eee, gray)",
                    backgroundClip: "border-box",
                    webkitBackgroundClip: "text",
                    webkitTextFillColor: "transparent",
                    fontStyle: "italic",
                  }}
                >
                  Simplicity is the keynote of all true elegance.
                </Typography>

                <Typography variant="body2" style={{ color: "gray", fontWeight: "bold" }} component="p">
                  - Coco Chanel
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
