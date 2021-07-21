import React, { Component } from "react";

import { withFirebase } from "../Firebase";

// material-ui...
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardBlog from "./CardBlog";

class Blogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      user: null,
      anchorEl: null,
      uniqueIdForAnchorEl: null,
    };
  }

  handleClick = (event, uniqueIdForAnchorEl) => {
    this.setState({
      anchorEl: event.currentTarget,
      uniqueIdForAnchorEl: uniqueIdForAnchorEl,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
      uniqueIdForAnchorEl: null,
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
    const { anchorEl, uniqueIdForAnchorEl, posts } = this.state;
    const open = Boolean(anchorEl);

    const renderPosts = () => {
      const collection = Object.keys(posts).map((id) => {
        return (
          <CardBlog
            key={id}
            id={id}
            uniqueIdForAnchorEl={uniqueIdForAnchorEl}
            anchorEl={anchorEl}
            open={open}
            posts={posts}
            handleClick={this.handleClick}
            handleClose={this.handleClose}
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
