import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import VideoPlayer from "../../utils/VideoPlayer";
import { CSSTransition } from "react-transition-group";
import "./animations.scss";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(
  (theme) => ({
    description: {
      color: "#fff",
      marginTop: "1rem",
      fontSize: "1.3rem",
      width: "100%",

      ["@media (min-width:767px)"]: {
        width: "50%",
      },
      margin: "0 auto",
    },

    header: {
      color: "aqua",
      marginBottom: "2rem",
    },
  }),
  { index: 1 }
);

const HeaderContainer = ({ cover, title, description, height, children, flexEnd, shadow }) => {
  const [inProp, setInProp] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setInProp(true);

    return () => {
      setInProp(false);
    };
  }, []);

  const container1 = {
    backgroundColor: `rgba(0, 0, 0, ${shadow || 0.6})`,
    backgroundBlendMode: "multiply",
    height: height || "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundImage: `url(${cover})`,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Container maxWidth={false} style={container1} disableGutters={true}>
      {children ? (
        children
      ) : (
        <div style={{ height: "100%" }}>
          <VideoPlayer url={cover} autoPlay={true} controls={false} />

          <Grid container style={{ height: "100%", padding: ".5rem" }} item direction="column" justify="center" align="center">
            <CSSTransition in={inProp} timeout={200} classNames="carousel-title">
              <Typography component="h2" variant="h2" className={classes.header}>
                {title}
              </Typography>
            </CSSTransition>

            {children}

            <Typography component="p" variant="body1" className={classes.description}>
              {description}
            </Typography>
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default HeaderContainer;
