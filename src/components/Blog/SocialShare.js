import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import { makeStyles } from '@material-ui/core'
import { FacebookShareButton, FacebookIcon } from 'react-share'
import { Helmet } from 'react-helmet'

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
  const imgUrl =
    'https://images.pexels.com/photos/9789897/pexels-photo-9789897.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ASd</title>
        <meta
          property="og:url"
          content="https://roat-to-firebase-with-react.web.app"
        />
        <meta property="og:description" content="asd" />
        <meta property="og:image" content={imgUrl} />
        <meta property="fb:app_id" content="393053855937435 " />
      </Helmet>

      <Typography variant="h6">Share On:</Typography>

      <FacebookShareButton
        quote={'This is my first post shared on Facebook!'}
        url={'https://roat-to-firebase-with-react.web.app'}
      >
        <FacebookIcon size={35} />
      </FacebookShareButton>

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
