import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
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

const SocialShare = (sda) => {
  const [meta] = useState({
    name: 'react-helmet-demo',
    description: 'Social Share Page',
    imgUrl:
      'https://images.pexels.com/photos/9758638/pexels-photo-9758638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  })

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{`Digital card of ${meta.name}`}</title>
        <link
          data-react-helmet="true"
          rel="canonical"
          href={window.location.href}
        />
        <meta name="description" content="Social Share" />
        <meta property="og:url" content={window.location.href} />
        <meta data-react-helmet="true" property="og:url" content="" />
        <meta
          property="og:description"
          content={meta.description}
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content={meta.imgUrl}
          data-react-helmet="true"
        />
        <meta
          property="og:image:secure_url"
          content={meta.imgUrl}
          data-react-helmet="true"
        />
        <meta
          property="og:image:height"
          content="1846"
          data-react-helmet="true"
        />
        <meta
          property="og:image:width"
          content="1200"
          data-react-helmet="true"
        />
      </Helmet>

      <Typography variant="h6">Share On:</Typography>

      <FacebookShareButton
        quote={'This is my first post shared on Facebook!'}
        url={window.location.href}
      >
        <FacebookIcon size={35} />
      </FacebookShareButton>
    </div>
  )
}

export default SocialShare
