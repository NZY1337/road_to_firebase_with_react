import React, { Component, createRef } from 'react'

import { withFirebase } from '../Firebase'

// material-ui...
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CardBlog from './CardBlog'
import HeaderContainer from './HeaderContainer'
import { SnackBarContext } from '../../utils/SnackBarContext'

class Blogs extends Component {
  static contextType = SnackBarContext

  constructor(props) {
    super(props)

    this.pathname = this.props.location.pathname
    this.definedCategory = this.props.location.categ

    this.state = {
      latestDoc: null,
      posts: [],
      filteredPosts: null,
      user: null,
      anchorEl: null,
      uniquePostId: null,
      uniqueStorageIdCallback: null,
      setCateg: null,
      lastKey: '',
      limit: 4,
      nodeLength: null,
    }
  }

  handleClick = (event, uniquePostId) => {
    const post = this.state.posts.filter((post) => post.postId === uniquePostId)

    this.setState({
      anchorEl: event.currentTarget,
      uniquePostId: uniquePostId,
      uniqueStorageIdCallback: post[0].uniqueStorageId,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      uniquePostId: null,
    })
  }

  getTheLengthOfRefferenceNode = () => {
    this.lenOfTheRef = this.props.firebase.db.ref(`${this.pathname}`)
    this.lenOfTheRef.on('value', (snapshot) => {
      this.setState({
        nodeLength: snapshot.numChildren(),
      })
    })
  }

  fetchPosts = (onLoad) => {
    console.log('fetching...')
    if (onLoad) {
      this.fetchPostsRef = this.props.firebase.db
        .ref(`${this.pathname}`)
        .orderByKey()
        .limitToFirst(4)
    } else {
      this.fetchPostsRef = this.props.firebase.db
        .ref(`${this.pathname}`)
        .orderByKey()
        .startAfter(this.state.lastKey)
        .limitToFirst(4)
    }

    this.fetchPostsRef.on('child_added', (snapshot) => {
      if (snapshot.val() !== null) {
        let post = { ...snapshot.val(), postId: snapshot.key }

        this.setState(
          (prevState) => {
            return {
              ...prevState,
              posts: [...prevState.posts, post],
              lastKey: snapshot.key, //! it'll take the last key because its inside a loop (~ is is good? )
            }
          },
          () => {
            if (this.definedCategory) {
              this.fetchItemsByCategory(this.definedCategory, this.state.posts)
            }
          },
        )
      }
    })
  }

  fetchItemsByCategory = (categ, items) => {
    const posts = [...items]

    const filteredPosts = posts.filter((post) => post.category === categ)

    this.setState({
      filteredPosts,
    })
  }

  fetchUser() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid })
      }
    })
  }

  componentDidMount() {
    this.getTheLengthOfRefferenceNode()
    this.fetchPosts(true)
    this.fetchUser()

    window.addEventListener('scroll', this.onScrollFetchPosts, false)
    this.snackBar = this.context
  }

  onScrollFetchPosts = () => {
    if (
      window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight &&
      this.state.nodeLength
    ) {
      this.fetchPosts()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.categ !== this.props.location.categ) {
      this.fetchItemsByCategory(this.props.location.categ, this.state.posts)
    }

    if (prevState.posts.length + 1 === prevState.nodeLength) {
      window.removeEventListener('scroll', this.onScrollFetchPosts)
      console.log('no more posts to be loaded')
    }
  }

  handleDeletePost = ({ postType }, uniquePostId, uniqueStorageId) => {
    const { storage, doRemoveItemsFromStorage } = this.props.firebase
    const postRefDB = this.props.firebase.db.ref(postType)

    const confirm = window.confirm('are you sure you want to delete this?')

    if (confirm) {
      const deletededPosts = this.state.posts.filter(
        (post) => post.postId !== uniquePostId,
      )
      this.setState({ posts: deletededPosts })

      postRefDB
        .child(`${uniquePostId}`)
        .remove()
        .then(() => {
          console.log(`${postType} deleted successfully`)
        })
        .catch((err) => console.log(err))

      doRemoveItemsFromStorage(
        `/${postType}/${uniqueStorageId}/images/cover`,
        'Cover Photo',
      )

      doRemoveItemsFromStorage(
        `/${postType}/${uniqueStorageId}/images/content/`,
        'Content Photos',
      )
    }

    this.handleClose()
  }

  componentWillUnmount() {
    this.fetchPostsRef.off('child_added', this.fetchPosts)
    this.lenOfTheRef.off('value', this.getTheLengthOfRefferenceNode)
    window.removeEventListener('scroll', this.handleScrollLoadPosts)
  }

  render() {
    const {
      anchorEl,
      uniquePostId,
      posts,
      user,
      filteredPosts,
      uniqueStorageIdCallback,
    } = this.state

    const open = Boolean(anchorEl)
    const cover =
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

    const renderPosts = () => {
      const decideWhatToRender = filteredPosts ? filteredPosts : posts

      return (
        decideWhatToRender &&
        decideWhatToRender.map((post) => {
          return (
            <CardBlog
              key={post.postId}
              user={user}
              id={post.postId}
              uniquePostId={uniquePostId}
              anchorEl={anchorEl}
              open={open}
              post={post}
              handleClick={this.handleClick}
              handleClose={this.handleClose}
              handleDeletePost={this.handleDeletePost}
              uniqueStorageIdCallback={uniqueStorageIdCallback}
            />
          )
        })
      )
    }

    return (
      <>
        <HeaderContainer
          cover={cover}
          title="Interior Design"
          //   height="50vh"
          description="The BrandNu Design and Hip Hop Architecture Camp founder sits in his remixed version of an Eames lounge chair and ottoman outside the State Capitol in Madison, Wisconsin. Photography by Hedi Lamar Photography."
        />
        <Container
          maxWidth="lg"
          style={{ marginTop: '7rem', marginBottom: '7rem' }}
        >
          <Grid spacing={2} ref={this.containerRef} container>
            {renderPosts()}
          </Grid>
        </Container>
      </>
    )
  }
}

export default withFirebase(Blogs)
