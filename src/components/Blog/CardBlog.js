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
import { Link } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";

/*
    !handle multiple menu item for MATERIAL UI;
    - if you want to open a specific menu, (or open something based on the current id (Link)) anchorEl should know on which id the event is point to
    - so we have a callback function which passes the actual id to the handleClick
    - the id is saved, and passed back to the component
    - id = uniqueIdForAnchorEl 
    
    - this principle is applied  for the Link inside the MenuItem when targeting specific post
*/

const CardBlog = ({ id, uniqueIdForAnchorEl, anchorEl, open, posts, handleClose, handleClick }) => {
  const post = posts[id];
  const urlTitle = post.title.toLowerCase().split(" ").join("-");

  return (
    <Grid item md={4}>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={
            <Button
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
                pathname: `/edit/${uniqueIdForAnchorEl}/`,
                state: {
                  data: posts[uniqueIdForAnchorEl],
                },
              }}
              color="secondary"
              onClick={() => console.log(id)}
            >
              Edit Post
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link color="secondary" onClick={() => console.log(uniqueIdForAnchorEl)}>
              Delete Post
            </Link>
          </MenuItem>
        </Menu>

        <CardActionArea>
          <CardMedia style={{ height: "150px", objectFit: "cover" }} image={post.cover} title="Contemplative Reptile" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button
            component={Link}
            endIcon={<AddIcon />}
            to={{
              pathname: `/blog/${urlTitle}`,
              state: {
                data: post, // id you want to get in Project component
              },
            }}
            size="small"
            variant="outlined"
            color="primary"
          >
            Read More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardBlog;
