import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";

class Blogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      user: null,
    };
  }

  fetchPosts = (user) => {
    const postsRef = this.props.firebase.db.ref(`/posts/${user}/blog/`);

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
    const renderPosts = () => {
      const collection = Object.keys(this.state.posts).map((key) => {
        return (
          <Grid item md={4}>
            <Link style={{ textDecoration: "none" }} key={key} to={`/blogs/blog/${key}`} id={key}>
              <img
                style={{ width: "100%" }}
                src="https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
              <p>Posted By: {this.state.user}</p>
            </Link>
          </Grid>
        );
      });

      return collection;
    };

    return (
      <Grid spacing={2} container>
        {renderPosts()}
      </Grid>
    );
  }
}

export default withFirebase(Blogs);
