import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import razvan from "../../assets/images/razvan.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
}));

const AboutUs = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" disableGutters className={classes.root}>
      <Grid container justify="flex-end" alignItems="flex-end" style={{ height: "100%" }}>
        <Grid
          item
          xl={6}
          md={6}
          justify="center"
          style={{
            backgroundColor: "black",
            display: "inline-flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            // backgroundColor: "rgba(0,0,0,.7)",
            height: "70%",
            padding: "3rem",
            background: "rgb(0,0,0)",

            // background: "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
            background: "linear-gradient(140deg, rgba(3,3,3,0) 50%, rgba(223,56,0,0.4) 100%)",
            filter:
              "progid:DXImageTransform.Microsoft.gradient(startColorstr='#833ab4',endColorstr='#ffffff',GradientType=1)",
          }}
        >
          <Typography component="h1" variant="h2">
            Despre Noi
          </Typography>
          <br /> <br />
          <Typography component="p" variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Typography>
          <br />
          <Button variant="outlined" color="primary" style={{ width: "150px" }}>
            Read More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
