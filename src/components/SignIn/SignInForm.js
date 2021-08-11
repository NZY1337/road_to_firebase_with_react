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

// contexts
import { SnackBarContext } from "../../utils/SnackBarContext";

// rest...
import { PasswordForgetForm } from "../PasswordForgot/passwordForgotForm";
import Modal from "../../utils/Modal";

const useStyles = (theme) => ({
  root: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    "& label.MuiFormLabel-root": {
      color: "lightgray",
      fontSize: "15px",
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
};

class SignInFormBase extends Component {
  static contextType = SnackBarContext;

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { handleOpen } = this.context;
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });

        this.props.history.push(ROUTES.LANDING);
        handleOpen("success", "You successfully logged in!");
      })
      .catch((error) => {
        handleOpen("error", error.message);
      });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { email, password } = this.state;

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

                <Modal title="Forgot Password ?">
                  <PasswordForgetForm />
                </Modal>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </>
    );
  }
}

const SignInForm = withRouter(withFirebase(withStyles(useStyles)(SignInFormBase)));

export { SignInForm };
// export default SignInForm;
