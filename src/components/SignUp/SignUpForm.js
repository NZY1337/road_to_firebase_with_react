import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

// HOC
import { withFirebase } from "../Firebase";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  avatar: null,
  error: null,
  uploadStatus: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  submitAvatar = (authUser) => {
    const { avatar, username, email, isAdmin } = this.state;
    const taskRef = this.props.firebase.storage.ref(`images/${avatar.name}`);
    const task = taskRef.put(avatar);
    const db = this.props.firebase.db;
    const history = this.props.history;
    const self = this;

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    task.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        self.setState({ uploadStatus: progress });
      },
      function (error) {
        // Handle unsuccessful uploads
      },

      function () {
        task.snapshot.ref.getDownloadURL().then(function (url) {
          console.log("File available at", url);

          try {
            db.ref("users/" + authUser.user.uid)
              .set({
                username,
                email,
                roles,
                url,
              })
              .then(() => {
                console.log("user successfully created");
              });

            history.push(ROUTES.HOME);
          } catch (err) {
            console.log(err);
          }
        });
      }
    );
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // upload user's profile image
        this.submitAvatar(authUser);
      })
      .then(() => {
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
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "" || email === "" || username === "" || avatar === null;

    return (
      <Grid container alignItems="center" justify="center" spacing={3} style={{ width: "100%", height: "100%" }}>
        <Grid item xs={3}>
          <Typography variant="h3" gutterBottom style={{ color: "#fff" }}>
            Sign Up
          </Typography>
          <form id="sign-up-form" onSubmit={this.onSubmit}>
            <div>
              <TextField
                type="text"
                name="username"
                margin="dense"
                id="filled-username"
                label="Username"
                onChange={this.onChange}
                defaultValue={username}
                variant="filled"
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
                variant="filled"
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
                variant="filled"
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
                variant="filled"
              />
            </div>

            <div style={{ margin: ".5rem 0" }}>
              <Button variant="contained" component="label">
                Upload Your Avatars
                <input type="file" name="avatar" onChange={this.onChangeAvatar} hidden />
              </Button>

              {avatar && <p>{avatar.name}</p>}
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
              style={{ marginTop: ".5rem", color: "#fff" }}
              endIcon={<SendIcon />}
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isInvalid}
            >
              Sign Up
            </Button>

            <div>{error && <p>{error.message}</p>}</div>

            {this.state.uploadStatus && <p>{Math.round(this.state.uploadStatus)} %</p>}
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

// https://www.youtube.com/watch?v=31MVIwvstzs - link uploaded images with the users' profile
// https://www.youtube.com/watch?v=PKwu15ldZ7k - react authentication with Firebase - full course by Kyle WebDevSimplified
// https://firebase.google.com/codelabs/firebase-web#7 - firebase chat msg
// https://stackoverflow.com/questions/41214447/firebase-user-uploads-and-profile-pictures - match image with profile user id
// https://stackoverflow.com/questions/54736051/upload-image-to-a-user-using-firebase-realtime-database-and-react
// https://stackoverflow.com/questions/42217131/how-to-upload-and-assign-profile-picture-to-user-during-registration-with-fireba/42248982
// https://www.freecodecamp.org/news/what-to-do-when-this-loses-context-f09664af076f/
// https://www.youtube.com/watch?v=oxqVnWPg0So
// https://stackoverflow.com/questions/61927039/firebase-cloud-storage-resource-the-server-responded-with-a-status-of-403 - JS permissions
