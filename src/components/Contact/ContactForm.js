import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

// HOC
import { withFirebase } from '../Firebase'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextArea from '../../utils/TextArea/TextArea'

// contexts
import { SnackBarContext } from '../../utils/SnackBarContext'

const useStyles = (theme) => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
    '& label.MuiFormLabel-root': {
      color: '#fff',
      fontSize: '15px',
    },

    '& label.Mui-focused': {
      color: 'aqua',
    },

    '& .MuiFilledInput-underline:after': {
      borderBottomColor: 'transparent',
    },
    '& .MuiInputBase-root': {
      color: '#fff',
      fontSize: '14px',
    },
  },
  btn: {
    border: '1px solid gray',
    '& .MuiButton-label': {
      color: 'aqua',
    },
  },
  forgotPw: {
    color: 'aqua!important',
  },
})

const INITIAL_STATE = { email: '', name: '', message: '' }

class ContactFormBase extends Component {
  static contextType = SnackBarContext

  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { handleOpen } = this.context
    const { email, password } = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE })

        this.props.history.push(ROUTES.LANDING)
        handleOpen('success', 'You successfully logged in!')
      })
      .catch((error) => {
        handleOpen('error', error.message)
      })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { email, name } = this.state

    const isInvalid = name === '' || email === ''
    const { classes } = this.props

    return (
      <>
        <Grid
          container
          alignItems="center"
          justify="center"
          spacing={3}
          style={{ height: '100%', width: '100%' }}
        >
          <Grid item xs={12} md={3}>
            <Typography variant="h3" gutterBottom style={{ color: '#fff' }}>
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
                  type="text"
                  name="name"
                  margin="dense"
                  id="filled-name"
                  label="Nume"
                  onChange={this.onChange}
                  defaultValue={name}
                  variant="filled"
                  className={classes.root}
                  InputProps={{
                    className: classes.labelColor,
                  }}
                />
              </div>

              <TextArea />

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
    )
  }
}

const ContactForm = withRouter(
  withFirebase(withStyles(useStyles)(ContactFormBase)),
)

export default ContactForm
