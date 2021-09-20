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
    this.defineCategory = this.props.location.categ;
    this.state = {
      posts: {},
      filteredPosts: null,
      user: null,
      anchorEl: null,
      uniquePostId: null,
      setCateg: null,
      lastKey: null,
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
      anchorEl: null,
      uniquePostId: null,
    });
  };

  fetchPosts = () => {
    this.postsRef = this.props.firebase.db.ref(`${this.pathname}`).limitToFirst(2);
    let lastKey = null;

    this.postsRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let posts = snapshot.val();

        snapshot.forEach((snap) => {
          lastKey = snap.key;
        });

        this.setState(
          {
            posts,
            lastKey,
          },
          () => {
            // as soon as we've got the posts - filter them then display them.
            if (this.defineCategory) {
              this.fetchItemsByCategory(this.defineCategory, posts);
            }
          }
        );
      } else {
        this.setState({
          posts: {},
        });
      }
    });
  };

  loadNextPosts = () => {
    this.postsRef = this.props.firebase.db
      .ref(`${this.pathname}`)
      .orderByKey()
      .startAfter(this.state.lastKey)
      .limitToFirst(1);

    this.postsRef.on("child_added", (snapshot) => {
      if (snapshot.val() !== null) {
        let newObj = { [snapshot.key]: { ...snapshot.val() } };

        // oldPosts - outside of the function - closure - will grab all posts
        // lastKey inside function loop - will grab only the last key
        this.setState({
          posts: { ...this.state.posts, ...newObj },
          lastKey: snapshot.key,
        });
      }
    });
  };

  fetchItemsByCategory = (categ, items) => {
    const posts = { ...items };

    const filteredPosts = Object.keys(posts)
      .filter((key) => posts[key].category === categ)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: posts[key],
        };
      }, {});

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
    this.fetchPosts();
    this.fetchUser();
  }

  componentWillUnmount() {
    this.postsRef.off("value");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.categ !== this.props.location.categ) {
      this.fetchItemsByCategory(this.props.location.categ, this.state.posts);
    }
  }

  handleDeletePost = ({ postType }, uniquePostId, uniqueStorageId) => {
    const { storage } = this.props.firebase;
    const postRefDB = this.props.firebase.db.ref(postType);

    const confirm = window.confirm("are you sure you want to delete this?");

    // https://stackoverflow.com/questions/47763653/how-to-write-delete-handler-in-reactjs-that-will-also-remove-data-in-firebase

    if (confirm) {
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

  render() {
    const { anchorEl, uniquePostId, posts, user, filteredPosts } = this.state;

    const open = Boolean(anchorEl);
    const cover =
      "https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

    const renderPosts = () => {
      const decideWhatToRender = filteredPosts ? filteredPosts : posts;
      const collection = Object.keys(decideWhatToRender).map((id) => {
        return (
          <CardBlog
            user={user}
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
          <Grid>
            <button onClick={this.loadNextPosts}>Load More Posts</button>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withFirebase(Blogs);
