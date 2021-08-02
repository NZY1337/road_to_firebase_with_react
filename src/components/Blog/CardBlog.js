import React from "react";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { Link, Redirect } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import logo from "../../assets/images/beadesignful-logo.png";

// material-ui CSS
import { makeStyles } from "@material-ui/core/styles";

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
  "@keyframes fromRightToLeft": {
    "0%": {
      marginLeft: "0px",
    },
    "50%": {
      marginLeft: "15px",
    },

    "75%": {
      marginLeft: "10px",
    },

    "100%": {
      marginRight: "0px",
    },
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

    "&:hover .cardcontent-summary p": {
      animation: `$fromRightToLeft .2s ${theme.transitions.easing.easeInOut}`,
    },

    "&:hover .MuiCardMedia-root": {
      transform: "scale(1.1)",
    },
  },

  cardMedia: {
    height: "450px",
    objectFit: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backgroundBlendMode: "multiply",
    transition: "all .2s",
  },

  cardContent: {
    position: "absolute",
    bottom: "10px",
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
  const classes = useStyles();

  return (
    <Grid item md={3}>
      <Card className={classes.card}>
        {user && (
          <>
            <CardHeader
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
                <Link to="#" color="secondary" onClick={() => handleDeletePost(post.category, uniquePostId)}>
                  Delete Post
                </Link>
              </MenuItem>
            </Menu>
          </>
        )}

        <CardActionArea>
          <CardMedia className={classes.cardMedia} image={post.cover} title="Contemplative Reptile" />
          <CardContent className={classes.cardContent}>
            <div className="cardcontent-summary">
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.description}
              </Typography>
            </div>

            <Button
              component={Link}
              //   endIcon={<AddIcon />}
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
