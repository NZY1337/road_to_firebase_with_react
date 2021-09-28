import React, { forwardRef } from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    width: "25px",
    height: "25px",
    backgroundColor: "rgb(243,230,99)",
    border: "5px solid rgba(136,136,136,.5)",
    borderRadius: "50%",
    position: "relative",
    boxShadow: "0 0 0 rgba(204, 169, 44, .4)",

    "& div.rightSide": {
      right: "20px",
      left: "unset",
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
}));

export function DraggableDot({ dot, currentX, currentY }, ref) {
  const { cover, company, description, id } = dot;

  const classes = useStyles();

  return (
    <div
      style={{ transform: `translate3d(${currentX}px, ${currentY}px, 0)` }}
      className={classes.item}
      ref={ref}
      id={id}
    >
      <div className="inner">
        <img src={cover} />
        <a href={company}>{description}</a>
      </div>
    </div>
  );
}

export default forwardRef(DraggableDot);
