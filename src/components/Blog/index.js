import React, { Component, createRef } from "react";

import { withFirebase } from "../Firebase";

// material-ui...
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardBlog from "./CardBlog";
import HeaderContainer from "./HeaderContainer";
import { SnackBarContext } from "../../utils/SnackBarContext";

class Blogs extends Component {
  static contextType = SnackBarContext;

  constructor(props) {
    super(props);

    this.pathname = this.props.location.pathname;
    this.definedCategory = this.props.location.categ;
    this.loadMoreRef = createRef();
    this.containerRef = createRef();

    this.state = {
      latestDoc: null,
      posts: [],
      filteredPosts: null,
      user: null,
      anchorEl: null,
      uniquePostId: null,
      uniqueStorageIdCallback: null,
      setCateg: null,
      lastKey: null,
      limit: 4,
      nodeLength: null,
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

  getTheLengthOfRefferenceNode = () => {
    this.lenOfTheReff = this.props.firebase.db.ref(`${this.pathname}`);
    this.lenOfTheReff.on("value", (snapshot) => {
      this.setState({
        nodeLength: snapshot.numChildren(),
      });
    });
  };

  fetchPosts = () => {
    this.postsRef = this.props.firebase.db.ref(`${this.pathname}`).limitToFirst(8);

    const newPosts = [];

    this.postsRef.on("child_added", (snapshot) => {
      if (snapshot.val() !== null) {
        let post = { ...snapshot.val(), postId: snapshot.key };
        newPosts.push(post);

        this.setState(
          {
            posts: newPosts,
            lastKey: snapshot.key,
          },
          () => {
            //! as soon as we've got the posts - filter them then display them.
            //! - we make sure that this.state.posts exists
            if (this.definedCategory) {
              this.fetchItemsByCategory(this.definedCategory, this.state.posts);
            }
          }
        );
      }
    });
  };

  loadNextPosts = () => {
    this.postsRef = this.props.firebase.db
      .ref(`${this.pathname}`)
      .orderByKey()
      .startAfter(this.state.lastKey)
      .limitToFirst(4);

    const oldPosts = [...this.state.posts];

    this.postsRef.on("child_added", (snapshot) => {
      if (snapshot.val() !== null) {
        let post = { ...snapshot.val(), postId: snapshot.key };
        oldPosts.push(post);

        // oldPosts - outside of the function - closure - will grab all posts
        // lastKey inside function loop - will grab only the last key
        this.setState({
          posts: oldPosts,
          lastKey: snapshot.key,
        });
      }
    });
  };

  fetchItemsByCategory = (categ, items) => {
    const posts = [...items];

    const filteredPosts = posts.filter((post) => post.category === categ);

    this.setState({
      filteredPosts,
    });
  };

  fetchUser() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid });
      }
    });
  }

  componentDidMount() {
    this.getTheLengthOfRefferenceNode();
    this.fetchPosts();
    this.fetchUser();

    this.snackBar = this.context;
  }

  componentWillUnmount() {
    this.postsRef.off("child_added");
    this.lenOfTheReff.off("value");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.categ !== this.props.location.categ) {
      this.fetchItemsByCategory(this.props.location.categ, this.state.posts);
    }
  }

  handleDeletePost = ({ postType }, uniquePostId, uniqueStorageId) => {
    console.log(postType, uniquePostId, uniqueStorageId);
    const { storage } = this.props.firebase;
    const postRefDB = this.props.firebase.db.ref(postType);

    const confirm = window.confirm("are you sure you want to delete this?");

    if (confirm) {
      postRefDB.on("child_removed", (snapshot) => {
        const deletedPost = snapshot.val();
        console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
      });

      postRefDB
        .child(`${uniquePostId}`)
        .remove()
        .then(() => {
          console.log(`${postType} deleted successfully`);
        })
        .catch((err) => console.log(err));

      //! duplication
      storage
        .ref(`/${postType}/${uniqueStorageId}/images/cover`)
        .listAll()
        .then((res) => {
          res.items.forEach((itemRef) => {
            // All the items under listRef.
            itemRef.getDownloadURL().then((url) => {
              let pictureRef = storage.refFromURL(url);
              pictureRef
                .delete()
                .then(() => console.log(`${postType} with id: ${uniqueStorageId} Cover Photo Deleted Successfully`))
                .catch((err) => console.log(err));
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });

      //! duplication
      storage
        .ref(`/${postType}/${uniqueStorageId}/images/content/`)
        .listAll()
        .then((res) => {
          console.log("content");
          res.items.forEach((itemRef) => {
            // All the items under listRef.
            itemRef.getDownloadURL().then((url) => {
              let pictureRef = storage.refFromURL(url);
              pictureRef
                .delete()
                .then(() => console.log(`${postType} with id: ${uniqueStorageId} Content Photos Deleted Successfully`))
                .catch((err) => console.log(err));
            });
          });
        });
    }

    this.handleClose();
  };

  handleScrollLoadPosts = () => {
    let triggerHeight = this.containerRef.current.scrollTop + this.containerRef.current.offsetHeight;

    if (triggerHeight >= this.containerRef.current.scrollHeight) {
      this.loadNextPosts();
    }

    if (this.state.nodeLength === this.state.posts.length) {
      this.containerRef.current.removeEventListener("scroll", this.handleScrollLoadPosts);
    }
  };

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
          console.log(post.title);
          return (
            <CardBlog
              key={post.title}
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
          height="50vh"
          description="The BrandNu Design and Hip Hop Architecture Camp founder sits in his remixed version of an Eames lounge chair and ottoman outside the State Capitol in Madison, Wisconsin. Photography by Hedi Lamar Photography."
        />
        <Container maxWidth="lg" style={{ marginTop: "5rem", marginBottom: "5rem" }}>
          <Grid
            style={{ maxHeight: "530px", overflow: "auto", scrollbarWidth: "none" }}
            spacing={2}
            ref={this.containerRef}
            onScroll={this.handleScrollLoadPosts}
            container
          >
            {renderPosts()}
          </Grid>
        </Container>
      </>
    );
  }
}

export default withFirebase(Blogs);
