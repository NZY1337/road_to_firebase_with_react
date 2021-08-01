import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import { withFirebase } from "../Firebase";

// contexts
import { SnackBarContext } from "../../utils/SnackBarContext";

import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  email: "",
  error: null,
};

const useStyles = (theme) => ({
  root: {
    width: "100%",
    "& label.MuiFormLabel-root": {
      color: "aqua!important",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "aqua",
    },
    "& .MuiInputBase-root": {
      color: "aqua",
      fontSize: "14px",
    },

    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "aqua",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "aqua",
      },
      "&:hover fieldset": {
        borderColor: "aqua",
      },
      "&.Mui-focused fieldset": {
        borderColor: "aqua",
      },
    },
  },
  btnDisabled: {
    backgroundColor: "gray!important",
    border: "none!important",

    "& span": {
      color: "black",
      textTransform: "none",
      fontSize: "14px",
    },
  },
  btn: {
    // backgroundColor: theme.palette.success.dark,
    border: "none!important",

    "& span": {
      color: "#fff",
      textTransform: "none",
      fontSize: "14px",
    },
  },
});

class PasswordForgetFormBase extends Component {
  static contextType = SnackBarContext;

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // take the context and pass the further errors
    const { handleOpen } = this.context;

    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        handleOpen("success", "A confirmation mail for resetting your password has been sent! Check your email.");
      })
      .catch((error) => {
        this.setState({ error });
        handleOpen("error", error.message);
      });
  };

  onChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";
    const { classes } = this.props;

    return (
      <form onSubmit={this.onSubmit} style={{ textAlign: "right" }}>
        <TextField
          type="email"
          name="email"
          margin="dense"
          id="filled-email"
          className={classes.root}
          label="Email"
          onChange={this.onChange}
          defaultValue={email}
          variant="outlined"
        />

        <Button
          style={{ marginTop: ".5rem" }}
          variant="contained"
          color="secondary"
          type="submit"
          className={isInvalid ? classes.btnDisabled : classes.btn}
          disabled={isInvalid}
        >
          Reset
          <RotateLeftIcon />
        </Button>
      </form>
    );
  }
}

const PasswordForgetLink = ({ color }) => {
  return (
    <Link className={color} to={ROUTES.PASSWORD_FORGET}>
      Forgot Password?
    </Link>
  );
};

const PasswordForgetForm = withFirebase(withStyles(useStyles)(PasswordForgetFormBase));

export { PasswordForgetForm, PasswordForgetLink };
