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
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextArea from "../../utils/TextArea/TextArea";

// contexts
import { SnackBarContext } from "../../utils/SnackBarContext";
import axios from "axios";

const useStyles = (theme) => ({
  root: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    "& label.MuiFormLabel-root": {
      color: "#fff",
      fontSize: "15px",
    },

    "& label.Mui-focused": {
      color: "aqua",
    },

    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "transparent",
    },
    "& .MuiInputBase-root": {
      color: "#fff",
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

const INITIAL_STATE = { email: "", name: "", message: "" };

class ContactFormBase extends Component {
  static contextType = SnackBarContext;

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { handleOpen } = this.context;
    const { message, email } = this.state;

    // try {
    //   handleOpen("success", "Your mail has been sent!");
    //   this.setState({ ...INITIAL_STATE });

    //   await axios.post("http://localhost:4000/send_mail", {
    //     text: message,
    //     fromUser: email,
    //   });
    // } catch (err) {
    //   handleOpen("error", err.message);
    // }

    await axios
      .post("http://localhost:4000/send_mail", {
        text: message,
        fromUser: email,
      })
      .then((res) => {
        this.setState({ ...INITIAL_STATE });
        handleOpen("success", "Your email has been sent!");
      })
      .catch((err) => handleOpen("error", err.message));
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { email, name, message } = this.state;

    const isInvalid = name === "" || email === "" || message === "";
    const { classes } = this.props;

    return (
      <>
        <Grid container alignItems="center" justify="center" spacing={3} style={{ height: "100%", width: "100%" }}>
          <Grid item xs={12} sm={7} md={5} lg={4} xl={3}>
            <Typography variant="h3" gutterBottom style={{ color: "#fff" }}>
              Contact Us
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
                  value={email}
                  variant="filled"
                  className={classes.root}
                  InputProps={{
                    className: classes.labelColor,
                  }}
                />
              </div>

              <div>
                <TextField
                  type="text"
                  name="name"
                  margin="dense"
                  id="filled-name"
                  label="Nume"
                  onChange={this.onChange}
                  value={name}
                  variant="filled"
                  className={classes.root}
                  InputProps={{
                    className: classes.labelColor,
                  }}
                />
              </div>

              <TextArea message={message} onHandleChange={this.onChange} />

              <Grid container justify="space-between" alignItems="center" item>
                <Button
                  className={isInvalid && classes.btn}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isInvalid}
                >
                  Trimite
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </>
    );
  }
}

const ContactForm = withRouter(withFirebase(withStyles(useStyles)(ContactFormBase)));

export default ContactForm;
