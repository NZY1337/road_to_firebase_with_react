import React from "react";
import { useHistory, useLocation } from "react-router";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Carousel from "./carousel";
import Categories from "./Categories";

import SnackBar from "../../utils/SnackBar";

const Landing = () => {
  const history = useLocation();
  const { severity, openSnack, error } = history;

  const [open, setOpen] = React.useState(openSnack);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Carousel />
      <Categories />
      <SnackBar msg={error} open={open} handleClose={handleClose} severity={severity} />
    </>
  );
};

export default Landing;
