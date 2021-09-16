import React from "react";
import "./togglebtn.scss";

export default function ToggleButton({ handleOpenPopover, ariaDescribedBy, toggle }) {
  return (
    <div onClick={handleOpenPopover} className={`bars ${toggle ? "open" : ""}`}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}
