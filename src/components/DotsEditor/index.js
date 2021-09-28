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
  });

  //? all bullets from BulletsForm
  const [dots, setDots] = useState([]);

  const [dotCover, setDotCover] = useState("");

  const [posts, setPosts] = useState([]);

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const dotId = uuidv4().slice(0, 6);

    setDots([...dots, { ...dotsValues, id: dotId }]);

    setDotsValues({
      company: "",
      cover: "",
      description: "",
    });
  };

  const handleAutocompleteChange = (_, post) => {
    // console.log(post);
    post && setDotCover(post.cover);
  };

  useEffect(() => {
    let posts = [];

    firebase.db.ref(searchValues.post).on("value", (snap) => {
      Object.keys(snap.val()).map((postId) => {
        const post = { ...snap.val()[postId], key: postId };
        posts.push(post);
        setPosts(posts);
      });
    });
  }, [searchValues.post]);

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
            <AddDotsForm values={dotsValues} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} />
          </Grid>

          <Grid container item lg={5} direction="column" justify="center">
            <Typography component="h4" style={{ color: "#f50057" }}>
              Please choose your <b>Post Type</b>.{" "}
            </Typography>

            <Typography component="p" style={{ marginBottom: "1rem", color: "gray" }}>
              <i>Then select your title.</i>
            </Typography>

            <SearchCoverForm
              values={searchValues}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
            />

            <ComboBox
              posts={posts}
              //   autoCompleteValue={dotCover}
              handleAutocompleteChange={handleAutocompleteChange}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default withFirebase(DotsEditor);
