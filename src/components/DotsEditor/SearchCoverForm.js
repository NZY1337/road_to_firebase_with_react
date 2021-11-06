import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      // width: "100%",
    },

    btn: {
      "& .MuiButton-label": {
        color: "gray",
      },
    },
  }),
  { index: 1 }
);

const postTypes = [
  {
    value: "blog",
  },
  {
    value: "portofoliu",
  },
];

export function SearchCoverForm({ values, onSubmitHandler, onChangeHandler }) {
  const { title, post } = values;

  const classes = useStyles();

  const isInvalid = title === "" || post === "";

  return (
    <form id="search-cover-form" onSubmit={onSubmitHandler} autoComplete="off" className={classes.root} style={{ marginBottom: ".5rem" }}>
      <div>
        <TextField
          id="search-post"
          select
          name="post"
          label="Post Type"
          variant="outlined"
          margin="dense"
          size="small"
          value={post}
          onChange={onChangeHandler}
          //   fullWidth
          SelectProps={{
            renderValue: (value) => value,
          }}
        >
          {postTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  );
}

export default SearchCoverForm;
