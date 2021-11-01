import React from "react";
import Grid from "@material-ui/core/Grid";
import VideoPlayer from "../../utils/VideoPlayer";

// material-ui CSS
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
  post,
  handleClose,
  handleClick,
  handleDeletePost,
  uniqueStorageIdCallback,
}) => {
  const { postType, cover, title, description } = post;

  const [imgLoaded, videoLoaded] = UseLazyLoading(post);

  return (
    <Grid item sm={6} md={4} lg={3} xs={12}>
      {imgLoaded && (
        <SingleCard
          user={user}
          id={id}
          uniquePostId={uniquePostId}
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleClick={handleClick}
          handleDeletePost={handleDeletePost}
          postType={postType}
          post={post}
          uniqueStorageIdCallback={uniqueStorageIdCallback}
        />
      )}

      {videoLoaded && (
        <SingleCard
          user={user}
          id={id}
          uniquePostId={uniquePostId}
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          handleClick={handleClick}
          handleDeletePost={handleDeletePost}
          postType={postType}
          post={post}
          uniqueStorageIdCallback={uniqueStorageIdCallback}
        >
          <VideoPlayer url={cover} autoPlay={false} controls={false} />
        </SingleCard>
      )}

      {post.cover && !imgLoaded && !post.cover.includes(".mp4") && (
        <Skeleton width="100%" height="500px" count={1} delay={1} />
      )}

      {post.cover && !videoLoaded && post.cover.includes(".mp4") && (
        <Skeleton width="100%" height="500px" count={1} delay={1} />
      )}
    </Grid>
  );
};

export default CardBlog;
