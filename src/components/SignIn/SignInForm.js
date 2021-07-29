import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

// HOC
import { withFirebase } from "../Firebase";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SnackBar from "../../utils/SnackBar";

// rest...
import { PasswordForgetLink } from "../PasswordForgot/passwordForgotForm";

const useStyles = (theme) => ({
  root: {
    width: "100%",
    "& label.MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "aqua",
    },
    "& .MuiInputBase-root": {
      color: "aqua",
      fontSize: "14px",
    },
  },
  btn: {
    border: "1px solid gray",
    "& .MuiButton-label": {
      color: "gray",
    },
  },
  forgotPw: {
    color: "aqua!important",
  },
});

const INITIAL_STATE = {
  email: "",
  password: "",
  alert: {
    openSnack: false,
    severity: "",
    error: null,
  },
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push({
          pathname: ROUTES.LANDING,
          severity: "success",
          openSnack: true,
          error: "You successfully logged in!",
        });
      })
      .catch((error) => {
        const alert = { ...this.state.alert };
        alert.severity = "error";
        alert.openSnack = true;
        alert.error = error.message;
        this.setState({ alert });
      });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    const alert = { ...this.state.alert };
    alert.openSnack = false;
    this.setState({ alert });
  };

  render() {
    const {
      email,
      password,
      alert: { openSnack, severity, error },
    } = this.state;

    const isInvalid = password === "" || email === "";
    const { classes } = this.props;

    return (
      <>
        <Grid container alignItems="center" justify="center" spacing={3} style={{ height: "100%", width: "100%" }}>
          <Grid item xs={12} md={3}>
            <Typography variant="h3" gutterBottom style={{ color: "#fff" }}>
              Sign In
            </Typography>
            <form id="sign-in-form" onSubmit={this.onSubmit}>
              <div>
                <TextField
                  id="filled-email"
                  name="email"
                  margin="dense"
                  label="Email"
                  type="email"
                  onChange={this.onChange}
                  defaultValue={email}
                  variant="filled"
                  className={classes.root}
                  InputProps={{
                    className: classes.labelColor,
                  }}
                />
              </div>

              <div>
                <TextField
                  type="password"
                  name="password"
                  margin="dense"
                  id="filled-password"
                  label="Password"
                  onChange={this.onChange}
                  defaultValue={password}
                  variant="filled"
                  className={classes.root}
                  InputProps={{
                    className: classes.labelColor,
                  }}
                />
              </div>

              <Grid container justify="space-between" alignItems="center" item>
                <Button
                  className={isInvalid && classes.btn}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isInvalid}
                >
                  Sign In
                </Button>

                <PasswordForgetLink color={classes.forgotPw} />
              </Grid>
            </form>

            <SnackBar msg={error} handleClose={this.handleClose} open={openSnack} severity={severity} />
          </Grid>
        </Grid>
      </>
    );
  }
}

const SignInForm = withRouter(withFirebase(withStyles(useStyles)(SignInFormBase)));

export { SignInForm };
// export default SignInForm;
