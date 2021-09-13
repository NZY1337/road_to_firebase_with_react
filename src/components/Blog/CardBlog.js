import React, { useContext } from "react";

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
import { UseLazyLoading } from "../../utils/helpers";

import Skeleton from "react-loading-skeleton";

import SingleCard from "./SingleCard";

// conext

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


  const { postType, cover, title, description } = post;

  const [imgLoaded, videoLoaded] = UseLazyLoading(post);

  return (
    <>
      <Grid item md={6} lg={3} xs={12}>
        {imgLoaded && (
          <SingleCard
            user={user}
            id={id}
            uniquePostId={uniquePostId}
            anchorEl={anchorEl}
            open={open}
            posts={posts}
            handleClose={handleClose}
            handleClick={handleClick}
            handleDeletePost={handleDeletePost}
            postType={postType}
            cover={cover}
            title={title}
            description={description}
            visibility={visibility}
            post={post}
            postTitle={postTitle}
          />
        )}

        {videoLoaded && (
          <SingleCard
            user={user}
            id={id}
            uniquePostId={uniquePostId}
            anchorEl={anchorEl}
            open={open}
            posts={posts}
            handleClose={handleClose}
            handleClick={handleClick}
            handleDeletePost={handleDeletePost}
            postType={postType}
            cover={cover}
            title={title}
            description={description}
            visibility={visibility}
            post={post}
            postTitle={postTitle}
          >
            <VideoPlayer url={cover} autoPlay={false} controls={false} />
          </SingleCard>
        )}

        {!imgLoaded && !post.cover.includes(".mp4") && <Skeleton width="100%" height="500px" count={1} delay={1} />}
        {!videoLoaded && post.cover.includes(".mp4") && <Skeleton width="100%" height="500px" count={1} delay={1} />}
      </Grid>
    </>
  );
};

export default CardBlog;
