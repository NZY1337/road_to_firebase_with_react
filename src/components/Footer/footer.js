import React from "react";
import "./footer.scss";
import logo from "../../assets/images/beadesignful-logo.png";
import { Container, Grid, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: "#000",
      color: "#fff",
      paddingTop: "2rem",
      paddingBottom: "2rem",
    },

    footer: {
      display: "flex",
      padding: 0,
      listStyle: "none",

      "& li": {
        marginRight: "1rem",
        "& a": {
          color: "#fff",
        },
      },
    },
  }),
  { index: 1 }
);

export default function Footer() {
  const classes = useStyles();

  const footerNav = {
    footer: [
      {
        name: "Our World",
        description: "Welcome to a place where visuals matter. On BeauDesignful, smart voices and original ideas take center stage - with no ads in sight. Watch",
      },

      {
        name: "Create Your Future Today",
        description: "Find all topics you care interested in, and we will deliver the best ideas for your apetite. Explore, Discover, Enjoy.",
      },

      {
        name: "Explore Our Projects",
        description: "Thank you for being a member of WebDesignfull. You might get unlimited access to insightful stories from amazing designers.",
        bonus: "Browse More...",
      },
    ],
  };

  const footerMenu = [
    {
      name: "Home",
      link: "",
    },

    {
      name: "About",
      link: "",
    },

    {
      name: "Legal",
      link: "",
    },
  ];

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {footerNav.footer.map((item, index) => {
            return (
              <Grid item md={4} lg={4} key={index}>
                <Typography variant="h5" gutterBottom>
                  {item.name}
                </Typography>
                <Typography>
                  {item.description}

                  {item.bonus && (
                    <Link component="a" color="secondary" variant="body2" style={{ marginLeft: ".5rem" }} href="#">
                      {item.bonus}
                    </Link>
                  )}
                </Typography>
              </Grid>
            );
          })}
        </Grid>

        <hr className="w-100" style={{ margin: "1rem 0" }} />

        <Grid container flex="center" spacing={3} alignItems="center">
          <Grid item md={8} lg={8} container flex="center" alignItems="center">
            <img src={logo} style={{ width: "60px", height: "60px", marginRight: "1rem" }} alt="" />
            <Typography variant="h4"> BeauDesignful</Typography>
          </Grid>

          <Grid md={4} lg={4} item>
            <ul className={classes.footer}>
              {footerMenu.map((item, index) => {
                return (
                  <li key={index}>
                    <Link href="#">{item.name}</Link>
                  </li>
                );
              })}
            </ul>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
