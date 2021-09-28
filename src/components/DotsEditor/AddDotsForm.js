import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-root": {
      fontSize: "14px",
    },

    width: "100%",

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
  const { company, cover, description } = values;
  const classes = useStyles();

  const isInvalid = company === "" || cover === "" || description === "";

  return (
    <React.Fragment>
      <Typography style={{ textAlign: "left", color: "black" }} component="p" variant="body2">
        Add your bullets. Remember that each bullet is <b>draggable</b>.
      </Typography>
      <form id="sign-in-form" onSubmit={onSubmitHandler} autoComplete="off">
        <TextField
          id="dots-company"
          name="company"
          margin="dense"
          label="Company"
          type="url"
          onChange={onChangeHandler}
          value={company}
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
          type="company"
          onChange={onChangeHandler}
          value={cover}
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
          value={description}
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
            <Typography component="p">Submit Data Bullet</Typography>
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default AddDotsForm;
