import React, { useState, useEffect, useContext } from 'react'
import HeaderContainer from '../Blog/HeaderContainer'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import AddDotsForm from './AddDotsForm'
import SearchCoverForm from './SearchCoverForm'
import ComboBox from '../../utils/Autocomplete'
import { withFirebase } from '../Firebase'
import { Typography } from '@material-ui/core'
import DotsModule from './DotsModule'
import { v4 as uuidv4 } from 'uuid'
import { SnackBarContext } from '../../utils/SnackBarContext'

import DotsPreview from './DotsModule/DotsPreview'

const defaultCover =
  'https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

export function DotsEditor({ firebase }) {
  const { handleOpen } = useContext(SnackBarContext)
  // Dots Informations bullet form
  const [dotsValues, setDotsValues] = useState({
    company: '',
    cover: '',
    description: '',
  })

  // select a new Bullet Post Form
  const [searchValues, setSearchValues] = useState({
    post: 'blog',
    title: '',
    key: '',
  })

  const [dots, setDots] = useState([]) // all bullets from BulletsForm or Firebase
  const [dotCover, setDotCover] = useState('')
  const [posts, setPosts] = useState([])
  const [currentDotId, setCurrentDotId] = useState('')
  const [showSubmitDotsBtn, setShowSubmitDotsBtn] = useState(false)

  const onHandleAddDotsToCurrentPost = () => {
    const postRef = firebase.db
      .ref()
      .child(`/${searchValues.post}/${searchValues.key}`)

    const result = (array) =>
      array.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})

    const dotsCoord = result(dots)

    postRef
      .update({ dotsCoord })
      .then(() => {
        handleOpen('success', 'Post has been successfully updated!')
        setShowSubmitDotsBtn(false)
        emptyDotsValues()
      })
      .catch((err) => handleOpen('error', `Error : ${err}`))
  }

  const emptyDotsValues = () => {
    setDotsValues({
      company: '',
      cover: '',
      description: '',
    })
  }

  const onEditDotHandler = (id) => {
    const currentDot = dots.find((dot) => dot.id === id)

    setCurrentDotId(id)
    setDotsValues({
      company: currentDot.company,
      cover: currentDot.cover,
      description: currentDot.description,
    })
  }

  const onDeleteDotHandler = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this dot?')

    if (confirm) {
      const postRef = firebase.db.ref(
        `${searchValues.post}/${searchValues.key}/dotsCoord/${id}`,
      )

      postRef
        .remove()
        .then(() => {
          emptyDotsValues()
          handleOpen(
            'success',
            `${searchValues.post}/${searchValues.key}/dotsCoord/${id} removed successfully`,
          )
        })
        .catch((err) => handleOpen('error', `error ${err}, please try again`))
    }
  }

  const onChangeHandler = (e) => {
    e.persist()
    const {
      target: { name, value },
    } = e

    // it's safe to use currentTarget here
    if (e.currentTarget.id.startsWith('dots')) {
      setDotsValues({
        ...dotsValues,
        [name]: value,
      })
    } else {
      setPosts([])

      setSearchValues({
        ...searchValues,
        [name]: value,
      })
    }
  }

  const fetchCurrentDotPost = (postKey) => {
    const postRef = firebase.db.ref(`/${searchValues.post}/${postKey}`)

    postRef.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        const dotsCoord = snapshot.val().dotsCoord
        let defaultArr = []
        if (dotsCoord) {
          Object.keys(dotsCoord).map((id) => {
            const dot = dotsCoord[id]
            defaultArr.push(dot)
          })
          setDots(defaultArr)
        } else {
          setDots([])
        }
      } else {
        setDots([])
      }
    })
  }

  const handleAutocompleteChange = (_, post) => {
    if (post) {
      fetchCurrentDotPost(post.key)
      setSearchValues({
        ...searchValues,
        title: post.title,
        key: post.key,
      })
      setDotCover(post.cover)
      emptyDotsValues()
      setShowSubmitDotsBtn(false)
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const dotId = uuidv4().slice(0, 6)

    if (!currentDotId) {
      const coords = {
        currentX: null,
        currentY: null,
        initialX: null,
        initialY: null,
        offsetX: 0,
        offsetY: 0,
        isDotPassingHalfScreen: false,
        ...dotsValues,
        id: dotId,
      }

      setDots([...dots, { ...coords }])
    } else {
      const allDots = [...dots]
      const dotIdx = allDots.findIndex((dot) => dot.id === currentDotId)

      allDots[dotIdx] = {
        ...allDots[dotIdx],
        company: dotsValues.company,
        cover: dotsValues.cover,
        description: dotsValues.description,
      }

      setDots(allDots)
      setCurrentDotId('')
    }

    emptyDotsValues()
    setShowSubmitDotsBtn(true)
  }

  useEffect(() => {
    firebase.db.ref(searchValues.post).on('value', (snap) => {
      let newPosts = []
      // eslint-disable-next-line array-callback-return
      if (snap.val() !== 'null') {
        Object.keys(snap.val()).map((postId) => {
          const post = { ...snap.val()[postId], key: postId }
          newPosts.push(post)
        })

        setPosts(newPosts)
      }
    })
  }, [searchValues.post, firebase.db])

  //   small hack
  useEffect(() => {
    const close = document.getElementsByClassName(
      'MuiAutocomplete-clearIndicator',
    )[0]

    // Add a Click Event Listener to the button
    close.addEventListener('click', () => {
      setSearchValues({ post: 'blog', title: '', key: '' })
      setDots([])
      emptyDotsValues()
      setShowSubmitDotsBtn(false)
    })
  }, [])

  return (
    <div style={{ backgroundColor: 'snow' }}>
      <HeaderContainer
        cover={dotCover || defaultCover}
        title="Data Visualization Editor"
        description="A visualization of the most important detatails of an interior
        design creation."
      >
        <DotsModule dots={dots} setShowSubmitDotsBtn={setShowSubmitDotsBtn} />
      </HeaderContainer>

      <Container
        maxWidth="lg"
        style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
      >
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid
            container
            item
            lg={5}
            direction="column"
            justify="center"
            align="center"
          >
            <AddDotsForm
              postTitle={searchValues.title}
              values={dotsValues}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
            />
          </Grid>

          <Grid container item lg={5} direction="column" justify="center">
            <Typography
              component="h4"
              color="secondary"
              style={{ marginBottom: '.5rem' }}
            >
              Choose your <b>post type</b> then select your <b>post title</b> in
              order to add bullets to your post.
            </Typography>

            <SearchCoverForm
              values={searchValues}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
            />

            <ComboBox
              posts={posts}
              autoCompleteValue={searchValues.title}
              handleAutocompleteChange={handleAutocompleteChange}
            />
          </Grid>
        </Grid>

        <DotsPreview
          searchValues={searchValues}
          dots={dots}
          onEditDotHandler={onEditDotHandler}
          onDeleteDotHandler={onDeleteDotHandler}
          onHandleAddDotsToCurrentPost={onHandleAddDotsToCurrentPost}
          showSubmitDotsBtn={showSubmitDotsBtn}
        />
      </Container>
    </div>
  )
}

export default withFirebase(DotsEditor)
