import React from "react";
import "./togglebtn.scss";

export default function ToggleButton({ handleOpenPopover, ariaDescribedBy, toggle }) {
  return (
    <div onClick={handleOpenPopover} className={`bars ${toggle ? "open" : ""}`}>
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>
  );
}
