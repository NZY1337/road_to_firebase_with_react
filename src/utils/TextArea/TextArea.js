import React, { useRef, useEffect, useState } from 'react'
import './textarea.scss'

//! https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize - make autosizable textarea
// https://codepen.io/JimmyC543/pen/gObpyOZ - textarea example
const TextArea = () => {
  const areaRef = useRef()
  const [value, setValue] = useState('')

  const onHandleChange = (e) => {
    setValue(e.target.value)
  }

  const decideClass = value !== '' ? 'not-empty' : ''

  return (
    <div id="cancellationNotesContainer" class="form-group full">
      <textarea
        ref={areaRef}
        maxlength="255"
        onChange={onHandleChange}
        id="cancellationNotes"
        name="cancellationNotes"
        value={value}
        className={decideClass}
      ></textarea>
      <label>Mesaj</label>
    </div>
  )
}

export default TextArea
