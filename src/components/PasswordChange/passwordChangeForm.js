import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

// HOC
import { withFirebase } from "../Firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

const useStyles = (theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  root: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    "& label.MuiFormLabel-root": {
      //   color: "#fff",
      color: "lightgray",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "aqua",
    },
    "& .MuiInputBase-root": {
      color: "aqua",
    },
  },
  btn: {
    "&.MuiButton-contained.Mui-disabled": {
      backgroundColor: "lightgray",
      color: "gray",
    },
  },
  forgotPw: {
    color: "aqua!important",
  },
});

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne === "" || passwordOne !== passwordTwo;
    const { classes } = this.props;

    return (
      <Grid>
        <h1 style={{ color: "#fff" }}>Reset Password</h1>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <TextField
            id="filled-passwordOne"
            name="passwordOne"
            margin="dense"
            label="Password One"
            type="password"
            onChange={this.onChange}
            defaultValue={passwordOne}
            variant="filled"
            className={classes.root}
          />

          <TextField
            type="password"
            name="passwordTwo"
            margin="dense"
            id="filled-passwordTwo"
            label="Password Two"
            onChange={this.onChange}
            defaultValue={passwordTwo}
            variant="filled"
            className={classes.root}
          />

          <Button
            style={{ marginTop: ".5rem" }}
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isInvalid}
            className={isInvalid && classes.btn}
          >
            Reset My Password
          </Button>

          {error && <p>{error.message}</p>}
        </form>
      </Grid>
    );
  }
}

const PasswordChangeForm = withFirebase(withStyles(useStyles)(PasswordChangeFormBase));

export default PasswordChangeForm;
