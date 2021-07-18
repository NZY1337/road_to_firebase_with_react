import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";

class SingleBlog extends Component {
  constructor(props) {
    super(props);

    this.postId = this.props.match.params.id;

    this.state = {
      content: null,
    };
  }

  fetchPost = (user) => {
    const postRef = this.props.firebase.db.ref(`/posts/${user}/blog/${this.postId}`);

    postRef.on("value", (snapshot) => {
      this.setState({
        content: snapshot.val(),
      });
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
    return <ReactQuill value={content} theme="bubble" readOnly />;
  }
}

export default withFirebase(SingleBlog);
