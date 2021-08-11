import React, { Component } from "react";
import ReactQuill from "react-quill";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withFirebase } from "../Firebase";

import HeaderContainer from "./HeaderContainer";

import SocialShare from "./SocialShare";

class SingleBlog extends Component {
  constructor(props) {
    super(props);

    this.userId = this.props.match.params.id;
    this.postType = this.props.location.pathname.split("/")[1];

    this.state = {
      content: {},
    };
  }

  fetchPost = (user) => {
    const postsRef = this.props.firebase.db.ref(`${this.postType}/${this.userId}`);

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
    this.fetchPost();

    // this.props.firebase.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.fetchPost(user.uid);
    //   }
    // });
  }

  render() {
    const {
      content: { title, cover, description, editorContent },
    } = this.state;

    return (
      <>
        <HeaderContainer style={{ marginTop: "5rem" }} cover={cover} title={title} description={description} />

        <Container maxWidth="lg" style={{ marginTop: "5rem", marginBottom: "5rem" }}>
          <Grid container>
            <Grid item md={2}>
              <SocialShare />
            </Grid>
            <Grid item md={9}>
              <ReactQuill value={editorContent || ""} theme="bubble" readOnly />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withFirebase(SingleBlog);
