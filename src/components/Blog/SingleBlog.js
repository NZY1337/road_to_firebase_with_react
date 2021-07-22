import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Container, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";

class SingleBlog extends Component {
  constructor(props) {
    super(props);

    this.title = this.props.match.params.title.split("-").join(" ");
    this.postType = this.props.location.pathname.split("/")[1];

    console.log(this.title);

    this.state = {
      content: {},
    };
  }

  fetchPost = (user) => {
    const postsRef = this.props.firebase.db.ref(`${this.postType}/${user}/${this.title}`);

    postsRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let content = snapshot.val();

        this.setState({
          content: content,
        });
      }
    });
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchPost(user.uid);
      }
    });
  }

  render() {
    const { content } = this.state;

    return (
      <Container maxWidth="lg">
        <Typography align="center" gutterBottom={true} variant="h2">
          {this.state.content.title}
        </Typography>
        <ReactQuill value={this.state.content.editorContent || ""} theme="bubble" readOnly />
      </Container>
    );
  }
}

export default withFirebase(SingleBlog);
