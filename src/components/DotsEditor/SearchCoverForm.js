import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    // "& .MuiFilledInput-root": {
    //   backgroundColor: "#fff",
    //   border: "1px solid lightgray",
    // },
    width: "100%",
    "& label.MuiFormLabel-root": {
      color: "gray",
      fontSize: "15px",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "aqua",
    },
    "& .MuiInputBase-root": {
      color: "#000",
      fontSize: "14px",
    },
  },
  btn: {
    "& .MuiButton-label": {
      color: "gray",
    },
  },
  forgotPw: {
    color: "aqua!important",
  },
}));

const currencies = [
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
    <form id="search-cover-form" onSubmit={onSubmitHandler} autoComplete="off" style={{ marginBottom: "1rem" }}>
      {/* <TextField
        id="search-title"
        name="title"
        margin="dense"
        label="Title"
        type="title"
        onChange={onChangeHandler}
        defaultValue={title}
        variant="outlined"
        className={classes.root}
      /> */}

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
          {currencies.map((option) => (
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
