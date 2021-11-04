import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withFirebase } from '../Firebase'
import Dot from '../DotsEditor/DotsModule/Dot'

import { withStyles } from '@material-ui/core/styles'
import HeaderContainer from './HeaderContainer'

import SocialShare from './SocialShare'

const useStyles = (theme) => ({
  item: {
    width: '25px',
    height: '25px',
    backgroundColor: 'rgb(243,230,99)',
    border: '5px solid rgba(136,136,136,.5)',
    borderRadius: '50%',
    position: 'relative',
    boxShadow: '0 0 0 rgba(204, 169, 44, .4)',
    animation: 'pulsate 1.5s infinite',

    '& div.rightSide': {
      right: '20px',
      left: 'unset!important',
    },

    '& div.leftSide': {
      left: '20px',
    },

    '&:hover': {
      cursor: 'pointer',
      animation: 'none',
    },

    '&:active': {
      backgroundColor: 'rgba(168, 218, 220, 1)',
    },

    '&:hover div.inner': {
      visibility: 'visible',
      scale: 1,
    },

    '& div.inner': {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      top: '-65px',
      left: '20px',
      visibility: 'hidden',
      scale: 0,
      width: 'auto',
      color: '#fff',
      width: '125px',
      height: 'auto',
      background: '#000',
      textAlign: 'center',
      padding: '.5rem',
      transition: 'all .2s',

      '& img': {
        width: '100%',
        objectFit: 'cover',
        height: '155px',
        zIndex: '1',
      },

      '& a': {
        color: '#fff',
        marginTop: '.5rem',
        textDecoration: 'none',
        fontSize: '14px',
      },
    },
  },
})

class SingleBlog extends Component {
  constructor(props) {
    super(props)

    this.postTypeId = this.props.match.params.id
    this.postType = this.props.location.pathname.split('/')[1]

    this.state = {
      content: {},
    }
  }

  fetchPost = (user) => {
    this.postRef = this.props.firebase.db.ref(
      `${this.postType}/${this.postTypeId}`,
    )

    this.postRef.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        let content = snapshot.val()

        this.setState({
          content,
        })
      }
    })
  }

  updatePostViewCounter = () => {
    this.postRefCounter = this.props.firebase.db
      .ref(`${this.postType}`)
      .child(`${this.postTypeId}`)
      .child('postViews')

    this.postRefCounter.transaction((views) => {
      return views + 1
    })
  }

  componentDidMount() {
    this.fetchPost()
    this.updatePostViewCounter()
  }

  componentWillUnmount() {
    this.postRef.off('value')
  }

  renderDots = () => {
    const { classes } = this.props

    if (this.state.content.hasOwnProperty('dotsCoord')) {
      const dots = this.state.content.dotsCoord

      return Object.keys(dots).map((id) => {
        const dot = dots[id]
        console.log(dot)
        return (
          <Dot classes={classes} key={dot.id} dot={dot} type="presentation" />
        )
      })
    }
  }

  render() {
    const {
      content: { title, cover, description, editorContent },
    } = this.state

    console.log(cover)
    return (
      <>
        <HeaderContainer style={{ marginTop: '5rem' }} cover={cover} title={title} description={description}>
          {this.renderDots()}
        </HeaderContainer>

        <Container maxWidth="lg"style={{ marginTop: '5rem', marginBottom: '5rem' }}>
          <Grid container>
            <Grid item md={2}>
              <SocialShare title={title} cover={cover} description={description}/>
                {this.state.content.postViews}
            </Grid>

            <Grid item md={9}>
              <ReactQuill value={editorContent || ''} theme="bubble" readOnly />
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
}

export default withFirebase(withStyles(useStyles)(SingleBlog))
