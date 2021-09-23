import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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

export function AddDotsForm({ values, onSubmitHandler, onChangeHandler }) {
  const { title, cover, description } = values;
  const classes = useStyles();

  const isInvalid = title === "" || cover === "" || description === "";

  return (
    <form id="sign-in-form" onSubmit={onSubmitHandler} autoComplete="off">
      <TextField
        id="dots-title"
        name="title"
        margin="dense"
        label="Title"
        type="title"
        onChange={onChangeHandler}
        defaultValue={title}
        variant="outlined"
        className={classes.root}
        InputProps={{
          className: classes.labelColor,
        }}
      />

      <TextField
        id="dots-cover"
        name="cover"
        margin="dense"
        label="Cover"
        type="cover"
        onChange={onChangeHandler}
        defaultValue={cover}
        variant="outlined"
        className={classes.root}
        style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
        InputProps={{
          className: classes.labelColor,
        }}
      />

      <TextField
        type="description"
        name="description"
        margin="dense"
        id="dots-description"
        label="Description"
        onChange={onChangeHandler}
        defaultValue={description}
        variant="outlined"
        className={classes.root}
        InputProps={{
          className: classes.labelColor,
        }}
      />

      <Grid container justify="space-between" alignItems="center" item>
        <Button
          className={isInvalid && classes.btn}
          variant="contained"
          color="secondary"
          type="submit"
          disabled={isInvalid}
          style={{ marginTop: ".5rem", textTransform: "capitalize" }}
        >
          <Typography component="p">Submit New Data Bullet</Typography>
        </Button>
      </Grid>
    </form>
  );
}

export default AddDotsForm;
