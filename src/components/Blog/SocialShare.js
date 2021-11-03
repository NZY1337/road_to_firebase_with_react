import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import { makeStyles } from '@material-ui/core'
import { FacebookShareButton } from 'react-share'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'sticky',
    left: 0,
    top: '50px',
    bottom: 0,

    '& button:focus': {
      outline: 'none',
    },

    '& svg': {
      display: 'inline-block',
      borderRadius: '50%',
      border: '2px solid',
      width: '17px',
      height: '17px',
      lineHeight: '17px',
      verticalAlign: 'middle',
      textAlign: 'center',
      boxSizing: 'content-box',
      padding: '5px',
      marginRight: '6px',
    },

    '& button.social-insta': {
      color: '#e1306c',
    },

    '& button.social-twitter': {
      color: '#1da1f2',
    },
  },
}))

const SocialShare = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h6">Share On:</Typography>
      <Link className="social-facebook" component="button" variant="body2">
        {/* <FacebookIcon /> */}
        <FacebookShareButton
          size={32}
          round={true}
          url={window.location.href}
          imageURL={
            'https://images.pexels.com/photos/9713309/pexels-photo-9713309.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
          }
        >
          Share your post
        </FacebookShareButton>
      </Link>

      <Link className="social-insta" component="button" variant="body2">
        <InstagramIcon />
      </Link>

      <Link className="social-twitter" component="button" variant="body2">
        <TwitterIcon />
      </Link>
    </div>
  )
}

export default SocialShare
