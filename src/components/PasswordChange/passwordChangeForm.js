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
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

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

    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h1>Reset Password</h1>
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField
                id="filled-passwordOne"
                name="passwordOne"
                margin="dense"
                label="PasswordOne"
                type="password"
                onChange={this.onChange}
                defaultValue={passwordOne}
                variant="outlined"
              />
            </div>

            <div>
              <TextField
                type="password"
                name="passwordTwo"
                margin="dense"
                id="filled-passwordTwo"
                label="Password Two"
                onChange={this.onChange}
                defaultValue={passwordTwo}
                variant="outlined"
              />
            </div>

            <Button
              style={{ marginTop: ".5rem" }}
              variant="contained"
              color="primary"
              type="submit"
              disabled={isInvalid}
            >
              Reset My Password
            </Button>

            {error && <p>{error.message}</p>}
          </form>
        </Grid>
      </Grid>
    );
  }
}

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export default PasswordChangeForm;
// export default PasswordChangeForm;
