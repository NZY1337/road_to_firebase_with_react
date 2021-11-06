import React from "react";

import { makeStyles } from "@material-ui/core";
import "./animation.scss";
import Dot from "./Dot";

const useStyles = makeStyles(
  (theme) => ({
    item: {
      width: "25px",
      height: "25px",
      backgroundColor: "rgb(243,230,99)",
      border: "5px solid rgba(136,136,136,.5)",
      borderRadius: "50%",
      position: "relative",
      boxShadow: "0 0 0 rgba(204, 169, 44, .4)",
      animation: "pulsate 1.5s infinite",

      "& div.rightSide": {
        right: "20px",
        left: "unset!important",
      },

      "& div.leftSide": {
        left: "20px",
      },

      "&:hover": {
        cursor: "pointer",
        animation: "none",
      },

      "&:active": {
        backgroundColor: "rgba(168, 218, 220, 1)",
      },

      "&:hover div.inner": {
        visibility: "visible",
        scale: 1,
      },

      "& div.inner": {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        top: "-65px",
        left: "20px",
        visibility: "hidden",
        scale: 0,
        width: "auto",
        color: "#fff",
        width: "125px",
        height: "auto",
        background: "#000",
        textAlign: "center",
        padding: ".5rem",
        transition: "all .2s",

        "& img": {
          width: "100%",
          objectFit: "cover",
          height: "155px",
          zIndex: "1",
        },

        "& a": {
          color: "#fff",
          marginTop: ".5rem",
          textDecoration: "none",
          fontSize: "14px",
        },
      },
    },
  }),
  { index: 1 }
);

export function DraggableDot({ dot, zIndex }) {
  const classes = useStyles();
  return <Dot dot={dot} classes={classes} />;
}

export default DraggableDot;
