import React, { useRef, useEffect, useState } from "react";
import "./textarea.scss";

//! https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize - make autosizable textarea
// https://codepen.io/JimmyC543/pen/gObpyOZ - textarea example
const TextArea = ({ message, onHandleChange }) => {
  const areaRef = useRef();
  const [value, setValue] = useState("");

  const decideClass = value !== "" ? "not-empty" : "";

  useEffect(() => {
    setValue(message);
  }, [message]);

  return (
    <div id="cancellationNotesContainer" className="form-group full">
      <textarea
        ref={areaRef}
        onChange={onHandleChange}
        spellCheck="false"
        id="cancellationNotes"
        name="message"
        value={value}
        className={decideClass}
      ></textarea>
      <label>Mesaj</label>
    </div>
  );
};

export default TextArea;
