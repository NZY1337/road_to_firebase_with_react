import React from 'react'
import CarouseLitemDetails from './carouseLitemDetails'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  videoWrapper: {
    position: 'relative',
    height: '100vh',
    zIndex: 1,

    '& h1': {
      color: '#fff',
      fontSize: '3rem',
    },

    '& h2': {
      fontSize: '2rem',
    },

    '& video': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },

    '& .video-details': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },

  carouselBgImg: {
    backgroundSize: 'cover',
    position: 'relative',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    width: '100%;',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
    backgroundBlendMode: 'multiply',

    '& h1': {
      color: '#fff',
      fontSize: '3rem',
    },

    '& h2': {
      fontSize: '2rem',
    },
  },

  carouselInfo: {
    position: 'relative',
    paddingLeft: '2rem',
    borderLeft: '1px solid white',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    flexBasis: 'auto !important',

    '& a': {
      marginTop: '1rem',
    },

    '& p': {
      color: '#fff',
      marginTop: '2rem',
    },

    '&::before': {
      position: 'absolute',
      top: '-45px',
      left: 0,
      transformOrigin: '0 0',
      color: '#fff',
      transform: 'skewY(20deg)',
      fontSize: '2rem',
      content: 'attr(data-number)',
      textShadow: '2px 4px 3px rgba(0, 0, 0, 0.3)',
      fontFamily: 'Playfair Display serif',
    },

    '& h2': {
      fontStyle: 'italic',
      color: 'aqua',
    },
  },
}))

const CarouselItem = ({
  index,
  url,
  title,
  subtitle,
  description,
  postType,
  blogId,
}) => {
  const classes = useStyles()
  const { carouselInfo } = classes

  const decideIfRenderVideoOrImg = () => {
    if (url && url.includes('.mp4')) {
      return (
        <div className={classes.videoWrapper}>
          <video>
            <source src={url} type="video/mp4" />
          </video>

          <div className="video-details">
            <CarouseLitemDetails
              index={index}
              title={title}
              description={description}
              subtitle={subtitle}
              carouselInfo={carouselInfo}
              postType={postType}
              blogId={blogId}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div
          className={classes.carouselBgImg}
          style={{ backgroundImage: `url(${url})` }}
        >
          <CarouseLitemDetails
            index={index}
            title={title}
            description={description}
            subtitle={subtitle}
            carouselInfo={carouselInfo}
            postType={postType}
            blogId={blogId}
          />
        </div>
      )
    }
  }
  return <>{decideIfRenderVideoOrImg()}</>
}

export default CarouselItem
