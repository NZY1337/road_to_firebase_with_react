import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

// HOC
import { withFirebase } from "../Firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "" || email === "" || username === "";

    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField
                type="text"
                name="username"
                margin="dense"
                id="filled-username"
                label="Username"
                onChange={this.onChange}
                defaultValue={username}
                variant="outlined"
              />
            </div>

            <div>
              <TextField
                id="filled-email"
                name="email"
                margin="dense"
                label="Email"
                type="email"
                onChange={this.onChange}
                defaultValue={email}
                variant="outlined"
              />
            </div>

            <div>
              <TextField
                type="password"
                name="passwordOne"
                margin="dense"
                id="filled-password-one"
                label="Password One"
                onChange={this.onChange}
                defaultValue={passwordOne}
                variant="outlined"
              />
            </div>

            <div>
              <TextField
                id="filled-password-two"
                name="passwordTwo"
                margin="dense"
                label="PasswordTwo"
                type="password"
                onChange={this.onChange}
                defaultValue={passwordTwo}
                variant="outlined"
              />
            </div>

            <Button
              style={{ marginTop: ".5rem" }}
              endIcon={<Icon>send</Icon>}
              variant="contained"
              color="primary"
              type="submit"
              disabled={isInvalid}
            >
              Sign Up
            </Button>

            {error && <p>{error.message}</p>}
          </form>
        </Grid>
      </Grid>
    );
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpLink = () => {
  return (
    <p>
      Don't Have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
  );
};

export { SignUpForm, SignUpLink };
// export default SignUpForm;
