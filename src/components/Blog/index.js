import React, { Component } from "react";

import { withFirebase } from "../Firebase";

// material-ui...
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardBlog from "./CardBlog";
import HeaderContainer from "./HeaderContainer";

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
    const postsRef = this.props.firebase.db.ref(`${this.pathname}/`);

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
    this.fetchPosts();

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid });
      }
    });
  }

  handleDeletePost = (category, postId) => {
    const posts = { ...this.state.posts };
    const ref = `${category}`;

    const postRef = this.props.firebase.db.ref(ref);

    const convertedPostsFromObjectToArray = Object.entries(posts);
    const filteredPosts = convertedPostsFromObjectToArray.filter(([key, value]) => key !== postId);
    const convertedPostsFromArrayToObject = Object.fromEntries(filteredPosts);
    this.handleClose();

    const confirm = window.confirm("are you shure you want to delete this?");

    if (confirm) {
      postRef.on("child_removed", (snapshot) => {
        if (snapshot.val()) {
          this.setState({ posts: convertedPostsFromArrayToObject });
        }
      });

      postRef.child(`${postId}`).remove();
    }
  };

  render() {
    const { anchorEl, uniquePostId, posts, user } = this.state;
    const open = Boolean(anchorEl);
    const cover =
      "https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

    const renderPosts = () => {
      const collection = Object.keys(posts).map((id) => {
        return (
          <CardBlog
            user={user}
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
      <>
        <HeaderContainer
          cover={cover}
          title="Interior Design"
          description="The BrandNu Design and Hip Hop Architecture Camp founder sits in his remixed version of an Eames lounge chair and ottoman outside the State Capitol in Madison, Wisconsin. Photography by Hedi Lamar Photography."
        />
        <Container maxWidth="lg" style={{ marginTop: "5rem", marginBottom: "5rem" }}>
          <Grid spacing={2} container>
            {renderPosts()}
          </Grid>
        </Container>
      </>
    );
  }
}

export default withFirebase(Blogs);
