import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import VideoPlayer from "../../utils/VideoPlayer";

const h6 = {
  color: "aqua",
  marginBottom: "2rem",
};

const p = {
  color: "#fff",
  marginTop: "1rem",
  width: "50%",
  margin: "0 auto",
};

const HeaderContainer = ({ cover, title, description, height, children, flexEnd, shadow }) => {
  const container1 = {
    backgroundColor: `rgba(0, 0, 0, ${shadow || 0.4})`,
    backgroundBlendMode: "multiply",
    height: height || "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundImage: `url(${cover})`,
  };

  const container2 = {
    display: "flex",
    justifyContent: "center",
    alignItems: flexEnd || "center",
    height: "100%",
  };

  return (
    <Container maxWidth={false} style={container1} disableGutters={true}>
      <VideoPlayer url={cover} autoPlay={true} controls={false} />
      <Container maxWidth="lg" style={container2}>
        <Grid container item direction="column" justify="center" align="center">
          <Typography component="h2" variant="h2" style={h6}>
            {title}
          </Typography>
          {children}

          <Typography component="p" variant="body1" style={p}>
            {description}
          </Typography>
        </Grid>
      </Container>
    </Container>
  );
};

export default HeaderContainer;
