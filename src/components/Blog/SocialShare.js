import React from 'react'

import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import { makeStyles } from '@material-ui/core'
import { FacebookShareButton, FacebookIcon } from 'react-share'
import HelmetMetaData from '../../utils/Helmet'

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
    'https://images.pexels.com/photos/9714732/pexels-photo-9714732.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  const url = 'https://roat-to-firebase-with-react.web.app'

  //  https://github.com/justswim/cra-metatag-demo/blob/master/server.js
  return (
    <div className={classes.root}>
      <HelmetMetaData
        imgUrl={imgUrl}
        description={'hy all'}
        url={'https://roat-to-firebase-with-react.web.app'}
      />

      <Typography variant="h6">Share On:</Typography>
      <a
        href={`http://www.facebook.com/share.php?href=${url}&title=kek&picture=${imgUrl}`}
      >
        FB Share
      </a>

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
