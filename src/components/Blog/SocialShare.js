import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      position: "sticky",
      left: 0,
      top: "50px",
      bottom: 0,

      "& button:focus": {
        outline: "none",
      },

      "& svg": {
        display: "inline-block",
        borderRadius: "50%",
        border: "2px solid",
        width: "17px",
        height: "17px",
        lineHeight: "17px",
        verticalAlign: "middle",
        textAlign: "center",
        boxSizing: "content-box",
        padding: "5px",
        marginRight: "6px",
      },

      "& button.social-insta": {
        color: "#e1306c",
      },

      "& button.social-twitter": {
        color: "#1da1f2",
      },
    },
  }),
  { index: 1 }
);

const SocialShare = ({ description, title, cover }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <meta property="og:image" content={cover} data-react-helmet="true" />
        <meta property="og:image:secure_url" content={cover} data-react-helmet="true" />
        <meta property="og:url" content={window.location.href} />
        <meta data-react-helmet="true" property="og:url" content="" />
        <meta property="og:description" content={description} data-react-helmet="true" />
        <meta property="og:image:height" content="1846" content="1846" />
        <meta property="og:image:width" content="1200" data-react-helmet="true" />
      </Helmet>

      <Typography variant="h6">Share On:</Typography>

      <FacebookShareButton quote={"This is my first post shared on Facebook!"} url={window.location.href}>
        <FacebookIcon size={35} />
      </FacebookShareButton>
    </div>
  );
};

export default SocialShare;
