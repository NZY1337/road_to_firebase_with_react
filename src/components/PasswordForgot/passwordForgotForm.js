import { Link } from "react-router-dom";
import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  onChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <Container maxWidth="lg">
        <h1>Reset password</h1>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <form onSubmit={this.onSubmit}>
              <div>
                <TextField
                  type="email"
                  name="email"
                  margin="dense"
                  id="filled-email"
                  label="Email"
                  onChange={this.onChange}
                  defaultValue={email}
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
                Reset Password
              </Button>

              {error && <p>{error.message}</p>}
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const PasswordForgetLink = () => {
  return (
    <Container>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </Container>
  );
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
