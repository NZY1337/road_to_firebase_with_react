import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Container, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";

class SingleBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.location.state.data.editorContent,
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        //
      }
    });
  }

  render() {
    const { content } = this.state;

    return (
      <Container maxWidth="lg">
        <Typography align="center" gutterBottom={true} variant="h2">
          {this.props.location.state.data.title}
        </Typography>
        <ReactQuill value={content} theme="bubble" readOnly />
      </Container>
    );
  }
}

export default withFirebase(SingleBlog);
