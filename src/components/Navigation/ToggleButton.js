import React from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "25px",
    cursor: "pointer",

    "&:hover": {
      "& span": {
        backgroundColor: "aqua",
      },
    },

    "& span": {
      background: "#fff",
      borderRadius: "10px",
      height: "2px",
      margin: "2px 0",
      transition: ".4s cubic-bezier(0.68, -0.6, 0.32, 1.6)",

      "&:nth-of-type(1)": {
        width: "50%",
      },

      "&:nth-of-type(2)": {
        width: "100%",
      },
      "&:nth-of-type(3)": {
        width: "75%",
      },
    },

    "& input[type='checkbox']:checked ~ span:nth-of-type(1)": {
      transformOrigin: "bottom",
      transform: "rotatez(45deg) translate(2px, 0px)",
      background: "rgb(0,255,255,.8)",
    },

    "& input[type='checkbox']:checked ~ span:nth-of-type(2)": {
      transformOrigin: "top",
      transform: "rotatez(-45deg)",
      zIndex: "1",
      background: "rgb(0,255,255,.7)",
    },

    "& input[type='checkbox']:checked ~ span:nth-of-type(3)": {
      transformOrigin: "right",
      width: "50%",
      transform: "translate(9px,3px) rotatez(45deg)",
      background: "rgb(0,255,255,.6)",
    },

    "& input[type='checkbox']": {
      display: "none",
    },
  },
}));

export default function ToggleButton() {
  const classes = useStyles();
  return (
    <label className={classes.root} htmlFor="check">
      <input type="checkbox" id="check" />
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
}
