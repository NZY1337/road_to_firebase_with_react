"use strict";

import React, { useState, useEffect } from "react";

import HeaderContainer from "../Blog/HeaderContainer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddDotsForm from "./AddDotsForm";
import SearchCoverForm from "./SearchCoverForm";
import ComboBox from "../../utils/Autocomplete";
import { withFirebase } from "../Firebase";
import { Typography } from "@material-ui/core";
import DotsModule from "./DotsModule";
import { v4 as uuidv4 } from "uuid";

import DotsPreview from "./DotsModule/DotsPreview";

const defaultCover =
  "https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export function DotsEditor({ firebase }) {
  const [dotsValues, setDotsValues] = useState({
    company: "",
    cover: "",
    description: "",
  });

  const [searchValues, setSearchValues] = useState({
    post: "blog",
    title: "",
    key: "",
  });

  const [dots, setDots] = useState([]); // all bullets from BulletsForm or Firebase
  const [dotCover, setDotCover] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentDotId, setCurrentDotId] = useState("");

  const onHandleAddDotsToCurrentPost = () => {
    const postRef = firebase.db.ref().child(`/${searchValues.post}/${searchValues.key}`);

    const result = (array) =>
      array.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {});

    const dotsCoord = result(dots);

    postRef
      .update({ dotsCoord })
      .then(() => console.log("Post has been successfully updated! :)"))
      .catch((err) => console.log(err));
  };

  const emptyDotsValues = () => {
    setDotsValues({
      company: "",
      cover: "",
      description: "",
    });
  };

  const onEditDotHandler = (id) => {
    const currentDot = dots.find((dot) => dot.id === id);

    setCurrentDotId(id);
    setDotsValues({
      company: currentDot.company,
      cover: currentDot.cover,
      description: currentDot.description,
    });
  };

  const onDeleteDotHandler = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this dot?");

    if (confirm) {
      const allDots = [...dots].filter((dot) => dot.id !== id);
      console.log(allDots);
      setDots(allDots);
    }
  };

  const onChangeHandler = (e) => {
    e.persist();
    const {
      target: { name, value },
    } = e;

    // it's safe to use currentTarget here
    if (e.currentTarget.id.startsWith("dots")) {
      setDotsValues({
        ...dotsValues,
        [name]: value,
      });
    } else {
      setPosts([]);
      setSearchValues({
        ...searchValues,
        [name]: value,
      });
    }
  };

  const handleAutocompleteChange = (_, post) => {
    post &&
      setSearchValues({
        ...searchValues,
        title: post.title,
        key: post.key,
      });

    post && setDotCover(post.cover);

    if (post) {
      const postRef = firebase.db.ref(`/${searchValues.post}/${post.key}`);

      postRef.on("value", (snapshot) => {
        const dotsCoord = snapshot.val().dotsCoord;

        let defaultArr = [];

        if (dotsCoord) {
          Object.keys(dotsCoord).map((id) => {
            console.log(dotsCoord[id]);
            const dot = dotsCoord[id];
            defaultArr.push(dot);
          });

          setDots(defaultArr);
        } else {
          setDots([]);
        }
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const dotId = uuidv4().slice(0, 6);

    if (!currentDotId) {
      const coords = {
        currentX: null,
        currentY: null,
        initialX: null,
        initialY: null,
        offsetX: 0,
        offsetY: 0,
        isDotPassingHalfScreen: false,
        ...dotsValues,
        id: dotId,
      };

      //! refactor, it is a single DOT not DOTS,  [dot, setDot] (should be)
      setDots([...dots, { ...coords }]);

      emptyDotsValues();
    } else {
      const allDots = [...dots];
      const dotIdx = allDots.findIndex((dot) => dot.id === currentDotId);
      allDots[dotIdx] = {
        ...allDots[dotIdx],
        company: dotsValues.company,
        cover: dotsValues.cover,
        description: dotsValues.description,
      };

      setDots(allDots);
      setCurrentDotId("");
      emptyDotsValues();
    }
  };

  useEffect(() => {
    let posts = [];

    firebase.db.ref(searchValues.post).on("value", (snap) => {
      // eslint-disable-next-line array-callback-return
      Object.keys(snap.val()).map((postId) => {
        const post = { ...snap.val()[postId], key: postId };
        posts.push(post);
        setPosts(posts);
      });
    });
  }, [searchValues.post, firebase.db]);

  //   small hack
  useEffect(() => {
    const close = document.getElementsByClassName("MuiAutocomplete-clearIndicator")[0];

    // Add a Click Event Listener to the button
    close.addEventListener("click", () => {
      setSearchValues({ post: "blog", title: "", key: "" });
    });
  }, []);

  return (
    <div style={{ backgroundColor: "snow" }}>
      <HeaderContainer
        cover={dotCover || defaultCover}
        title="Data Visualization Editor"
        description="A visualization of the most important detatails of an interior
        design creation."
      >
        <DotsModule dots={dots} />
      </HeaderContainer>

      <Container maxWidth="lg" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid container item lg={5} direction="column" justify="center" align="center">
            <AddDotsForm
              postTitle={searchValues.title}
              values={dotsValues}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
            />
          </Grid>

          <Grid container item lg={5} direction="column" justify="center">
            <Typography component="h4" style={{ color: "#f50057", marginBottom: ".5rem" }}>
              Choose your <b>post type</b> then select your <b>post title.</b> in order to add bullets to your post.
            </Typography>

            <SearchCoverForm
              values={searchValues}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
            />

            <ComboBox
              posts={posts}
              autoCompleteValue={searchValues.title}
              handleAutocompleteChange={handleAutocompleteChange}
            />
          </Grid>
        </Grid>

        <DotsPreview
          searchValues={searchValues}
          dots={dots}
          onEditDotHandler={onEditDotHandler}
          onDeleteDotHandler={onDeleteDotHandler}
          onHandleAddDotsToCurrentPost={onHandleAddDotsToCurrentPost}
        />
      </Container>
    </div>
  );
}

export default withFirebase(DotsEditor);
