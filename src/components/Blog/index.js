import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";

// material-ui...
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


class Blogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      user: null,
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  fetchPosts = (user) => {
    const postsRef = this.props.firebase.db.ref(`/blog/${user}/`);

    postsRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let posts = snapshot.val();
        this.setState({
          posts: posts,
        });
      } else {
        this.setState({
          posts: {},
        });
      }
    });
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchPosts(user.uid);

        this.setState({ user: user.email });
      }
    });
  }

  render() {
    const { user, anchorEl } = this.state;

    const renderPosts = () => {
      const collection = Object.keys(this.state.posts).map((key) => {
        const post = this.state.posts[key];

        return (
          <Grid key={key} item md={4}>
            <Card>
              {user && (
                <>
                  <CardHeader
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    action={
                      <Button color="secondary" endIcon={<MoreVertIcon />} onClick={this.handleClick}>
                        Edit
                      </Button>
                    }
                    title="Razvan Puricescu"
                    subheader="September 14, 2016"
                  />

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Delete Post</MenuItem>
                    <MenuItem onClick={this.handleClose}>Edit Post</MenuItem>
                  </Menu>
                </>
              )}

              <CardActionArea>
                <CardMedia
                  style={{ height: "150px", objectFit: "cover" }}
                  image={post.cover}
                  title="Contemplative Reptile"
                />
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
                    pathname: `/blog/${post.title}`,
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
      });

      return collection;
    };

    return (
      <Container maxWidth="lg">
        <Grid spacing={2} container>
          {renderPosts()}
        </Grid>
      </Container>
    );
  }
}

export default withFirebase(Blogs);
