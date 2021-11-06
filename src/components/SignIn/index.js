import React from "react";
import { SignInForm } from "./SignInForm";
import { Container, makeStyles } from "@material-ui/core";

// https://stackoverflow.com/questions/46966413/how-to-style-material-ui-textfield useStyles vs makeStyles
// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat

const useStyles = makeStyles(
  (theme) => ({
    root: {
      height: "100vh",
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundBlendMode: "multiply",
    },
  }),
  { index: 1 }
);

const url = "https://images.pexels.com/photos/6312362/pexels-photo-6312362.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const SignIn = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="xl">
      <SignInForm />
    </Container>
  );
};

export default SignIn;
