import React, { useState, useEffect, useRef } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import razvan from "../../assets/images/razvan.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    // backgroundImage: `url(${razvan})`,
    backgroundImage: `url(https://images.unsplash.com/photo-1593035013811-2db9b3c36980?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80)`,
    // backgroundImage: `url(https://scontent.fias1-1.fna.fbcdn.net/v/t1.6435-9/116117899_1630490850460374_5179122253420350643_n.jpg?_nc_cat=104&ccb=1-4&_nc_sid=09cbfe&_nc_ohc=vheEz6y4GuQAX9-AwKN&_nc_ht=scontent.fias1-1.fna&oh=10a527d78773519189662703ba07c2f6&oe=61396D87)`,
    color: "#fff",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backgroundBlendMode: "multiply",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "black",
    color: "#fff",
    width: "130px",
    height: "40px",
    "&:hover": {
      backgroundColor: "rgba(223,56,0,.4)",
    },
  },
  grd: {
    display: "inline-flex",
    flexDirection: "column",
    height: "50%",
    padding: "3rem",
    background: "rgb(0,0,0)",
    // alignItems: "center",
  },
  margin: {
    marginTop: "2rem",
    marginBottom: "1rem",
  },
}));

const AboutUsPreview = () => {
  const classes = useStyles();
  const divEl = useRef(null);
  const parentEl = useRef(null);
  let [deg, setDeg] = useState(300);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      const position = divEl.current && divEl.current.getBoundingClientRect();
      const parent = parentEl.current && parentEl.current.getBoundingClientRect();

      if (position) {
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
          setDeg((deg -= 3));
        }
      }
    });
  }, []);

  //   https://usefulangle.com/post/113/javascript-detecting-element-visible-during-scroll

  return (
    <Container maxWidth="xl" disableGutters className={classes.root} ref={parentEl}>
      <Grid container justify="flex-end" alignItems="center" style={{ height: "100%" }}>
        <Grid
          item
          xl={6}
          md={6}
          justify="center"
          className={classes.grd}
          ref={divEl}
          style={{
            background: `linear-gradient(${deg}deg, rgba(3,3,3,0) 50%, rgba(223,56,0,.4) 100%)`,
            background: `-moz-linear-gradient(${deg}deg, rgba(3,3,3,0) 50%, rgba(223,56,0,.4) 100%)`,
            background: `-webkit-linear-gradient(${deg}deg, rgba(3,3,3,0) 50%, rgba(223,56,0,.4) 100%)`,
          }}
        >
          {/* {deg} */}
          <Typography component="h1" variant="h2">
            Despre Noi
          </Typography>
          <Typography component="p" variant="body1" className={classes.margin}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Typography>
          <Button variant="contained" className={classes.btn}>
            Read More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUsPreview;
