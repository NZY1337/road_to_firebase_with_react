import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

// HOC
import { withFirebase } from "../Firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Button from "@material-ui/core/Button";

import { Input, InputLabel } from "@material-ui/core";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  avatar: null,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.db = this.props.firebase.db;

    console.log(this.db);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { username, email, passwordOne, isAdmin, avatar } = this.state;
    this.storage = this.props.firebase.storage;
    this.firebase = this.props.firebase;
    const db = this.props.firebase.db;
    const roles = {};

    console.log(this.db);

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // upload user's profile image
        const taskRef = this.storage.ref(`images/${avatar.name}`);
        const task = taskRef.put(avatar);

        task.on(
          "state_changed",
          function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          function (error) {
            // Handle unsuccessful uploads
          },
          function () {
            task.snapshot.ref.getDownloadURL().then(function (url) {
              console.log("File available at", url);

              try {
                db.ref("users/" + authUser.user.uid).set({
                  username,
                  email,
                  roles,
                  url,
                });
              } catch (err) {
                console.log(err);
              }
            });
          }
        );
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

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onChangeAvatar = (event) => {
    const myState = { ...this.state };
    myState.avatar = event.currentTarget.files[0];

    this.setState(myState);
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error, isAdmin, avatar } = this.state;
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

            <div style={{ margin: ".5rem 0" }}>
              <Button variant="contained" component="label">
                Upload Your Avatars
                <input type="file" name="avatar" onChange={this.onChangeAvatar} hidden />
              </Button>

              {/* {avatar && <p>{avatar}</p>} */}
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

            <div>
              <FormControlLabel
                value="end"
                control={<Checkbox checked={isAdmin} name="isAdmin" onChange={this.onChangeCheckbox} color="primary" />}
                label="Make Admin"
                labelPlacement="end"
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

// https://www.youtube.com/watch?v=31MVIwvstzs - link uploaded images with the users' profile
// https://www.youtube.com/watch?v=PKwu15ldZ7k - react authentication with Firebase - full course by Kyle WebDevSimplified
// https://firebase.google.com/codelabs/firebase-web#7 - firebase chat msg
// https://stackoverflow.com/questions/41214447/firebase-user-uploads-and-profile-pictures - match image with profile user id
// https://stackoverflow.com/questions/54736051/upload-image-to-a-user-using-firebase-realtime-database-and-react
// https://stackoverflow.com/questions/42217131/how-to-upload-and-assign-profile-picture-to-user-during-registration-with-fireba/42248982
