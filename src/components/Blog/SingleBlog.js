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

    this.postLoaded = false;
    this.postTypeId = this.props.match.params.id;
    this.postType = this.props.location.pathname.split("/")[1];

    this.state = {
      content: {},
    };
  }

  fetchPost = (user) => {
    this.postRef = this.props.firebase.db.ref(`${this.postType}/${this.postTypeId}`);

    this.postRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let content = snapshot.val();

        this.postLoaded &&
          this.setState({
            content,
          });
      }
    });
  };

  updatePostViewCounter = () => {
    this.postRefCounter = this.props.firebase.db.ref(`${this.postType}/${this.postTypeId}/postViews`);

    this.postLoaded &&
      this.postRefCounter.transaction((views) => {
        return views + 1;
      });
  };

  componentDidMount() {
    this.postLoaded = true;

    if (this.postLoaded) {
      this.fetchPost();
      //   this.updatePostViewCounter();
    }
  }

  componentWillUnmount() {
    this.postLoaded = false;
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
              {this.state.content.postViews}
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
