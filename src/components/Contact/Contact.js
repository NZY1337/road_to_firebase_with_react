import React from 'react'
import ContactForm from './ContactForm'
import { Container, makeStyles } from '@material-ui/core'

// https://stackoverflow.com/questions/46966413/how-to-style-material-ui-textfield useStyles vs makeStyles
// https://stackoverflow.com/questions/56432167/how-to-style-components-using-makestyles-and-still-have-lifecycle-methods-in-mat

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'multiply',
  },
}))

const url =
  'https://images.pexels.com/photos/2081176/pexels-photo-2081176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

const Contact = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root} maxWidth="xl">
      <ContactForm />
    </Container>
  )
}

export default Contact
