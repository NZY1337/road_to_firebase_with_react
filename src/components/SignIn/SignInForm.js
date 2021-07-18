import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import Container from "@material-ui/core/Container";

// HOC
import { withFirebase } from "../Firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
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
        console.log(authUser);
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
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>Sign In</h1>
            <form onSubmit={this.onSubmit}>
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
                  name="password"
                  margin="dense"
                  id="filled-password-one"
                  label="Password One"
                  onChange={this.onChange}
                  defaultValue={password}
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
                Sign In
              </Button>

              {error && <p>{error.message}</p>}
            </form>
          </Grid>
        </Grid>
      </>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export { SignInForm };
// export default SignInForm;
