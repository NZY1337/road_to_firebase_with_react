//different helpers functions
import { useState, useEffect } from 'react'

export const randomIndexBasedOnArrLen = (obj) => {
  // new obj to return
  let newObj = {}
  // create keys array
  var keys = Object.keys(obj)
  // randomize keys array
  keys.sort(function (a, b) {
    return Math.random() - 0.5
  })
  // save in new array
  keys.forEach(function (k) {
    newObj[k] = obj[k]
  })
  return newObj
}

export const UseLazyLoading = (data) => {
  const [source, setSource] = useState(null)
  const [source2, setSource2] = useState(false)

  useEffect(() => {
    if (data.cover && data.cover.includes('.mp4')) {
      const video = document.createElement('video')
      video.src = data.cover

      video.onloadeddata = () => {
        setSource2(true)
      }
    } else {
      const img = new Image()
      img.src = data.cover
      img.onload = () => {
        setSource(data.cover)
      }
    }
  }, [data.cover])

  return [source, source2]
}
