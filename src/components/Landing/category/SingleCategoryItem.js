import React from "react";
import "./categories.scss";
import { Link } from "react-router-dom";
import VideoPlayer from "../../../utils/VideoPlayer";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  videoWrapper: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
}));

function SingleCategoryItem({ item, id }) {
  const { videoWrapper } = useStyles();
  const { cover, title, description, postType } = item;
  const portfolioTitle = title.split(" ").join("-").toLowerCase();

  const portfolioRoute = `${postType}/${id}/${portfolioTitle}`;

  const decideUrlType = () => {
    if (cover.includes(".mp4")) {
      return (
        <Link to={portfolioRoute} alt={title} className="item-categ">
          <div className={videoWrapper}>
            <VideoPlayer url={cover} autoPlay={false} controls={false} position="absolute" />

            <div className="item-categ_details">
              <h1 className="item-categ_title mb-3">{title}</h1>
              <p>{description}</p>
            </div>
          </div>
        </Link>
      );
    } else {
      return (
        <Link to={portfolioRoute} style={{ backgroundImage: `url(${cover})` }} alt={title} className="item-categ">
          <div className="item-categ_details">
            <h1 className="item-categ_title mb-3">{title}</h1>
            <p>{description}</p>
          </div>
        </Link>
      );
    }
  };

  return <>{decideUrlType()}</>;
}

export default SingleCategoryItem;
