"use strict";

import React, { useState, useEffect } from "react";

import HeaderContainer from "../Blog/HeaderContainer";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AddDotsForm from "./AddDotsForm";
import SearchCoverForm from "./SearchCoverForm";
import ComboBox from "../../utils/Autocomplete";
import { withFirebase } from "../Firebase";

const defaultCover =
  "https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export function DotsEditor({ firebase }) {
  const [dotsValues, setDotsValues] = useState({
    title: "",
    cover: "",
    description: "",
  });

  const [searchValues, setSearchValues] = useState({
    title: "",
    post: "blog",
  });

  const [bulletCover, setBulletCover] = useState("");

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
  };

  const handleAutocompleteChange = (_, post) => {
    // console.log(post);
    post && setBulletCover(post.cover);
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

    // return () => postsRef.off("value");
  }, [searchValues.post]);

  return (
    <>
      <HeaderContainer
        style={{ marginTop: "5rem" }}
        cover={bulletCover || defaultCover}
        title="Data Visualization Editor"
        description="A visualization of the most important detatails of an interior design creation."
      />

      <Container maxWidth="lg" style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
        <Grid container justify="space-between">
          <Grid container item lg={5} direction="column" justify="center" align="center">
            <AddDotsForm values={dotsValues} onChangeHandler={onChangeHandler} onSubmitHandler={onSubmitHandler} />
          </Grid>

          <Grid container item lg={5} direction="column" justify="center">
            <SearchCoverForm
              values={searchValues}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
            />

            <ComboBox posts={posts} handleAutocompleteChange={handleAutocompleteChange} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default withFirebase(DotsEditor);
