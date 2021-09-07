import React, { useState, useEffect } from "react";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import logo from "../../assets/images/beadesignful-logo.png";
import VideoPlayer from "../../utils/VideoPlayer";

// material-ui CSS
import { makeStyles } from "@material-ui/core/styles";
import { useLazyLoading } from "../../utils/helpers";

/*
    ***********************************************
    !handle multiple menu item for MATERIAL UI;
    - if you want to open a specific menu, (or open something based on the current id (Link)) anchorEl should know on which id the event is point to
    - so we have a callback function which passes the actual id to the handleClick
    - the id is saved, and passed back to the component
    - id = uniquePostId 
    - this principle is applied  for the Link inside the MenuItem when targeting specific post
    ************************************************
*/

const useStyles = makeStyles((theme) => ({
  "@keyframes loadingAnimation": {
    "0%": {
      backgroundColor: "rgba(211, 211, 211, .4)",
    },
    "50%": {
      backgroundColor: "rgba(128,128,128, .4)",
    },
    "100%": {
      backgroundColor: "rgba(211, 211, 211, .4)",
    },
  },

  cardHeader: {
    zIndex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },

  myAnimation: {
    animation: `$loadingAnimation 600ms ${theme.transitions.easing.easeInOut} infinite`,
  },

  card: {
    "&:hover a": {
      left: "0px",
    },

    "& .cardcontent-summary p": {
      maxWidth: "100%",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 3,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    "& .cardcontent-summary": {
      marginBottom: "0px",
      transition: "all .2s",
    },

    "&:hover .cardcontent-summary": {
      marginBottom: "10px",
    },

    "&:hover .MuiCardMedia-root": {
      transform: "scale(1.1)",
    },
  },

  cardMedia: {
    height: "450px",
    objectFit: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    backgroundBlendMode: "multiply",
    transition: "all .2s",
  },

  cardContent: {
    position: "absolute",
    bottom: "0px",
    textAlign: "left",
    width: "100%",
    left: 0,

    "& h2": {
      color: "aqua",
    },
    "& p": {
      color: "#fff",
    },

    "& a": {
      marginTop: "1rem",
      color: "#fff",
      border: "none",
      textTransform: "none",
      padding: 0,
      textDecoration: "underline",
      left: "-100px",
      transition: "all .2s",

      "&:hover": {
        border: "none",
      },
    },
  },
}));

const CardBlog = ({
  pathname,
  user,
  id,
  uniquePostId,
  anchorEl,
  open,
  posts,
  handleClose,
  handleClick,
  handleDeletePost,
}) => {
  const post = posts[id];
  const postTitle = post.title.split(" ").join("-").toLowerCase();
  const visibility = user ? "block" : "none";

  const source = useLazyLoading(post);
  const classes = useStyles();

  return (
    <Grid item md={6} lg={3} xs={12}>
      <Card className={classes.card}>
        {user && (
          <>
            <CardHeader
              className={classes.cardHeader}
              avatar={<Avatar src={logo} aria-label="recipe" />}
              action={
                <Button
                  style={{ display: visibility }}
                  color="secondary"
                  endIcon={<MoreVertIcon />}
                  onClick={(e) => {
                    handleClick(e, id);
                  }}
                />
              }
              title="Razvan Puricescu"
              subheader="September 14, 2016"
            />

            <Menu id={id} anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
              <MenuItem onClick={handleClose}>
                <Link
                  to={{
                    pathname: `/edit/${post.category}/${uniquePostId}/`,
                  }}
                  color="secondary"
                >
                  Edit Post
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  to="#"
                  color="secondary"
                  onClick={() => {
                    const uniqueStorageId = posts[uniquePostId].uniqueStorageId;
                    handleDeletePost(post, uniquePostId, uniqueStorageId);
                  }}
                >
                  Delete Post
                </Link>
              </MenuItem>
            </Menu>
          </>
        )}

        <CardActionArea>
          <CardMedia
            className={`${classes.cardMedia} ${source == null && classes.myAnimation}`}
            image={post.cover} //!source - source drops an error
            title="Contemplative Reptile"
          >
            <VideoPlayer url={post.cover} autoPlay={false} controls={false} />
          </CardMedia>

          <CardContent className={classes.cardContent}>
            <div className="cardcontent-summary">
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.title}
              </Typography>
            </div>

            <Button
              component={Link}
              className="view-more"
              to={`${pathname}/${id}/${postTitle}`}
              size="small"
              variant="outlined"
              color="primary"
            >
              Read More
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CardBlog;
