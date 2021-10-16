import React, { useState, useRef, useEffect, useContext } from 'react'
import HeaderContainer from '../Blog/HeaderContainer'

import AboutUsFacts from './AboutUsFacts'
import { withFirebase } from '../Firebase'

import Button from '@material-ui/core/Button'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import { makeStyles } from '@material-ui/core'
import AboutUsForm from './AboutUsForm'
import AboutUsContent from './AboutUsContent'
import { SnackBarContext } from '../../utils/SnackBarContext'

const url =
  'https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: '5rem',
    marginBottom: '5rem',
  },
  designImg: {
    objectFit: 'cover',
    width: '100%',
    minHeight: '500px',
    borderRadius: '0% 100% 100% 0% / 100% 100% 100% 0%',
    opacity: '.4',
    src:
      'https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },

  aboutUsContainer: {
    collor: 'white',
    backgroundColor: '#000',
    paddingTop: '4rem',
    paddingBottom: '4rem',
  },

  aboutUsContent: {
    filter: 'blur(2px)',
    transition: 'all .40s',
    '&:hover': {
      filter: 'blur(0px)',
    },
  },
  picDescription: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    fontSize: '2.5rem',
  },
  picDescriptionContainer: {
    position: 'relative',
    alignSelf: 'baseline',

    '&::after': {
      content: '-moz-alt-content',
      //   top: 0,
      left: 0,
      position: 'absolute',
      width: '2rem',
      display: 'block',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '80%',
      backgroundColor: '#000',
    },
  },
}))

//! REACT HOOK FORM API
/*
    https://react-hook-form.com/get-started

    watch if you want to show smth into view () - type func

    -input type="number" returns a string; We can do that:
        {...register("age", { required: "This is required", valueAsNumber:true })}

*/

function AboutUs(props) {
  // state
  const [dataFromDb, setDataFromDb] = useState({})
  const [itemIdToBeEdited, setItemIdToBeEdited] = useState('')
  const classes = useStyles()
  const formRef = useRef(null)
  const { handleOpen } = useContext(SnackBarContext)

  const [intro, setIntro] = useState({
    title: '',
    subtitle: '',
  })
  const [description, setDescription] = useState({ values: [''] })

  const sendDataToFirebase = (data) => {
    const taskRef = props.firebase.db.ref('aboutUs')

    if (itemIdToBeEdited) {
      taskRef
        .child(itemIdToBeEdited)
        .set(data)
        .then((value) => {
          handleOpen('success', 'Item Edited Successfully!')
          setIntro({ title: '', subtitle: '' })
          setDescription((prevState) => ({ ...prevState, values: [] }))
          setItemIdToBeEdited(null)
        })
        .catch(({ message }) => {
          handleOpen('error', message)
        })
    } else {
      taskRef
        .push(data)
        .then((value) => {
          handleOpen('success', 'New Description Added Successfully!')
          setIntro({ title: '', subtitle: '' })
          setDescription((prevState) => ({ ...prevState, values: [] }))
        })
        .catch(({ message }) => handleOpen('error', message))
    }
  }

  const handleAddDescription = () => {
    setDescription((prevState) => ({ values: [...prevState.values, ''] }))
  }

  const handleRemove = (index) => {
    //! wondering if try/cactch should be implemented
    const values = [...description.values]
    values.splice(index, 1)
    setDescription({ values })
    handleOpen('success', 'Description deleted successfully!')
  }

  const onChangeDescription = (e, index) => {
    let initialDescriptions = [...description.values]
    initialDescriptions[index] = e.target.value
    setDescription({ values: initialDescriptions })
  }

  const onChangeIntro = ({ target: { name, value } }) => {
    setIntro((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const boundInputStates = { ...description.values, ...intro }

    sendDataToFirebase(boundInputStates)
  }

  const handleDeleteDataFromDb = (e) => {
    const ID = e.currentTarget.id
    const confirm = window.confirm('You Sure?')
    const taskRef = props.firebase.db.ref(`aboutUs`)

    if (confirm) {
      taskRef
        .child(`${ID}`)
        .remove()
        .then(() => {
          handleOpen('success', 'Item deleted successfully!')

          console.log('deleted successfully')
        })
        .catch(({ message }) => handleOpen('error', message))
    }
  }

  useEffect(() => {
    const details = props.firebase.db.ref('aboutUs')

    details.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        const details = snapshot.val()
        setDataFromDb(details)
      } else {
        setDataFromDb({})
      }
    })

    console.log(props.firebase.user())
  }, [props.firebase, props.firebase.db])

  const handleEditData = (id) => {
    // 120 = marginTop + header's height
    const topPosPlusFormHeight = Number(formRef.current.offsetTop) - 120
    window.scrollTo({ top: topPosPlusFormHeight, behavior: 'smooth' })

    setItemIdToBeEdited(id)
    const editData = dataFromDb[id]

    const {
      title,
      subtitle,
      0: description1,
      1: description2,
      2: description3,
    } = editData
    let values = []

    if (description1 !== undefined) {
      values = [...values, description1]
    }

    if (description2 !== undefined) {
      values = [...values, description2]
    }

    if (description3 !== undefined) {
      values = [...values, description3]
    }

    setDescription({ values })

    // setData back to State
    setIntro({ title, subtitle })
  }

  const renderDataToUx = () => {
    console.log('infinite')
    return Object.keys(dataFromDb).map((ID) => {
      const data = dataFromDb[ID]
      const {
        title,
        subtitle,
        0: description1,
        1: description2,
        2: description3,
      } = data

      return (
        <React.Fragment key={ID}>
          <AboutUsFacts
            key={ID}
            user={props.firebase.auth.currentUser}
            classes={classes}
            title={title}
            subtitle={subtitle}
            description1={description1}
            description2={description2}
            description3={description3}
            handleEditData={handleEditData}
            ID={ID}
            handleDeleteDataFromDb={handleDeleteDataFromDb}
          />
        </React.Fragment>
      )
    })
  }

  const renderDescription = () => {
    return description.values.map((value, index) => {
      return (
        <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
          <TextareaAutosize
            aria-label="minimum height"
            placeholder="Description..."
            value={value || ''}
            onChange={(e) => onChangeDescription(e, index)}
            style={{
              width: '100%',
              height: '150px',
              padding: '.5rem',
              marginBottom: '1rem',
            }}
          />

          <Button
            variant="outlined"
            color="secondary"
            size="small"
            style={{ marginLeft: '1rem' }}
            onClick={() => handleRemove(index)}
          >
            <RemoveCircleOutlineIcon />
          </Button>
        </div>
      )
    })
  }

  //   useEffect(() => {
  //     renderDataToUx()
  //   }, [renderDataToUx])

  return (
    <>
      <HeaderContainer
        cover={url}
        title="About Us"
        description="The BrandNu Design and Hip Hop Architecture Camp founder sits in his remixed version of an Eames lounge chair and ottoman outside the State Capitol in Madison, Wisconsin. Photography by Hedi Lamar Photography."
      />

      <AboutUsForm
        ref={formRef}
        onSubmit={onSubmit}
        classes={classes}
        onChangeIntro={onChangeIntro}
        renderDescription={renderDescription}
        intro={intro}
        handleAddDescription={handleAddDescription}
        user={props.firebase.auth.currentUser}
      />

      <AboutUsContent renderDataToUx={renderDataToUx} classes={classes} />
    </>
  )
}

export default withFirebase(AboutUs)
