import React, { Component } from "react";

import { withFirebase } from "../Firebase";

// material-ui...
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardBlog from "./CardBlog";

class Blogs extends Component {
  constructor(props) {
    super(props);

    this.pathname = this.props.location.pathname;

    this.state = {
      posts: {},
      user: null,
      anchorEl: null,
      uniquePostId: null,
    };
  }

  handleClick = (event, uniquePostId) => {
    this.setState({
      anchorEl: event.currentTarget,
      uniquePostId: uniquePostId,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
      uniquePostId: null,
    });
  };

  fetchPosts = (user) => {
    const postsRef = this.props.firebase.db.ref(`${this.pathname}/${user}/`);

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

        this.setState({ user: user.uid });
      }
    });

    // setPostsNumber
  }

  handleDeletePost = (category, postId) => {
    const posts = { ...this.state.posts };
    const { user } = this.state;
    const ref = `${category}/${user}`;
    console.log(ref);
    const postRef = this.props.firebase.db.ref(ref);

    const _this = this;

    const convertedPostsFromObjectToArray = Object.entries(posts);
    const filteredPosts = convertedPostsFromObjectToArray.filter(([key, value]) => key !== postId);
    const convertedPostsFromArrayToObject = Object.fromEntries(filteredPosts);
    this.handleClose();

    // const confirm = window.confirm("are you shure you want to delete this?");

    // if (confirm) {}

    postRef.on("child_removed", (snapshot) => {
      if (snapshot.val()) {
        this.setState({ posts: convertedPostsFromArrayToObject });
      }
    });

    postRef.child(`${postId}`).remove();
  };

  render() {
    const { anchorEl, uniquePostId, posts } = this.state;
    const open = Boolean(anchorEl);

    const renderPosts = () => {
      const collection = Object.keys(posts).map((id) => {
        return (
          <CardBlog
            pathname={this.pathname}
            key={id}
            id={id}
            uniquePostId={uniquePostId}
            anchorEl={anchorEl}
            open={open}
            posts={posts}
            handleClick={this.handleClick}
            handleClose={this.handleClose}
            handleDeletePost={this.handleDeletePost}
          />
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
