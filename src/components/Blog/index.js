import React, { Component, createRef } from "react";

import { withFirebase } from "../Firebase";

// material-ui...
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardBlog from "./CardBlog";
import HeaderContainer from "./HeaderContainer";
import { SnackBarContext } from "../../utils/SnackBarContext";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

class Blogs extends Component {
  static contextType = SnackBarContext;

  constructor(props) {
    super(props);

    this.pathname = this.props.location.pathname;
    this.definedCategory = this.props.location.categ;

    this.state = {
      latestDoc: null,
      posts: [],
      filteredPosts: null,
      user: null,
      anchorEl: null,
      uniquePostId: null,
      uniqueStorageIdCallback: null,
      setCateg: null,
      lastKey: "",
      nodeLength: null,
      showSpinner: false,
    };
  }

  handleClick = (event, uniquePostId) => {
    const post = this.state.posts.filter((post) => post.postId === uniquePostId);

    this.setState({
      anchorEl: event.currentTarget,
      uniquePostId: uniquePostId,
      uniqueStorageIdCallback: post[0].uniqueStorageId,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      uniquePostId: null,
    });
  };

  getRefLength = () => {
    const ref = this.props.firebase.db.ref(`${this.pathname}`);

    let self = this;
    ref.once("value").then(function (snapshot) {
      self.setState({
        nodeLength: snapshot.numChildren(),
      });
    });
  };

  fetchFirstBatch = () => {
    const firstBatchRef = this.props.firebase.db.ref(`${this.pathname}`).orderByKey().limitToFirst(4);

    try {
      firstBatchRef.on("child_added", (snapshot) => {
        if (snapshot.val() !== null) {
          let post = { ...snapshot.val(), postId: snapshot.key };

          this.setState((prevState) => {
            return {
              ...prevState,
              posts: [...prevState.posts, post],
              lastKey: snapshot.key,
            };
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  fetchNext5Batches = () => {
    const next5BatchRef = this.props.firebase.db
      .ref(`${this.pathname}`)
      .orderByKey()
      .startAfter(this.state.lastKey)
      .limitToFirst(4);

    try {
      next5BatchRef.on("child_added", (snapshot) => {
        if (snapshot.val() !== null) {
          let post = { ...snapshot.val(), postId: snapshot.key };
          console.log("loading...");
          this.setState(
            (prevState) => {
              return {
                ...prevState,
                posts: [...prevState.posts, post],
                lastKey: snapshot.key,
              };
            },
            () => {
              // we make sure that the state is updated and finishes the executions - due to asyncronicity
              if (this.state.posts.length === this.state.nodeLength) {
                window.removeEventListener("scroll", this.onScrollFetchPosts, false);
                this.setState({ showSpinner: true });
              }
            }
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  fetchUser() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid });
      }
    });
  }

  onScrollFetchPosts = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.fetchNext5Batches();
    }
  };

  handleDeletePost = ({ postType }, uniquePostId, uniqueStorageId) => {
    const { storage, doRemoveItemsFromStorage } = this.props.firebase;
    const postRefDB = this.props.firebase.db.ref(postType);

    const confirm = window.confirm("are you sure you want to delete this?");

    if (confirm) {
      const deletededPosts = this.state.posts.filter((post) => post.postId !== uniquePostId);
      this.setState({ posts: deletededPosts });

      postRefDB
        .child(`${uniquePostId}`)
        .remove()
        .then(() => {
          console.log(`${postType} deleted successfully`);
        })
        .catch((err) => console.log(err));

      doRemoveItemsFromStorage(`/${postType}/${uniqueStorageId}/images/cover`, "Cover Photo");

      doRemoveItemsFromStorage(`/${postType}/${uniqueStorageId}/images/content/`, "Content Photos");
    }

    this.handleClose();
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getRefLength();
    this.fetchFirstBatch();
    this.fetchUser();
    window.addEventListener("scroll", this.onScrollFetchPosts);

    this.snackBar = this.context;

    console.log(window.innerHeight + window.scrollY, document.body.offsetHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScrollFetchPosts);
  }

  render() {
    const { anchorEl, uniquePostId, posts, user, filteredPosts, uniqueStorageIdCallback } = this.state;

    const open = Boolean(anchorEl);
    const cover =
      "https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

    const renderPosts = () => {
      const decideWhatToRender = filteredPosts ? filteredPosts : posts;

      return (
        decideWhatToRender &&
        decideWhatToRender.map((post) => {
          return (
            <CardBlog
              key={post.postId}
              user={user}
              id={post.postId}
              uniquePostId={uniquePostId}
              anchorEl={anchorEl}
              open={open}
              post={post}
              handleClick={this.handleClick}
              handleClose={this.handleClose}
              handleDeletePost={this.handleDeletePost}
              uniqueStorageIdCallback={uniqueStorageIdCallback}
            />
          );
        })
      );
    };

    return (
      <>
        <HeaderContainer
          cover={cover}
          title="Interior Design"
          //   height="50vh"
          description="The BrandNu Design and Hip Hop Architecture Camp founder sits in his remixed version of an Eames lounge chair and ottoman outside the State Capitol in Madison, Wisconsin. Photography by Hedi Lamar Photography."
        />
        <Container maxWidth="lg" style={{ marginTop: "7rem", marginBottom: "7rem" }}>
          <Grid spacing={2} container>
            {renderPosts()}
          </Grid>

          <Grid spacing={2}>
            {this.state.showSpinner && (
              <Typography
                variant="p"
                component="p"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  display: "block",
                  marginTop: "1rem",
                  textAlign: "center",
                  background: "-webkit-linear-gradient(45deg, #09009f, #00ff95 80%)",
                  backgroundClip: "border-box",
                  webkitBackgroundClip: "text",
                  webkitTextFillColor: "transparent",
                }}
              >
                No More Posts to be loaded ...
              </Typography>
            )}
            {/* {this.state.showSpinner && <LinearProgress color="secondary" />} */}
          </Grid>
        </Container>
      </>
    );
  }
}

export default withFirebase(Blogs);
