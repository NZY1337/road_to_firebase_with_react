import React from "react";

const Dot = ({ currentX, currentY, classes, id, cover, isDotPassingHalfScreen, company, description }) => {
  return (
    <div style={{ transform: `translate3d(${currentX}px, ${currentY}px, 0)` }} className={classes.item} id={id}>
      <div className={`inner ${isDotPassingHalfScreen ? "rightSide" : "leftSide"}`}>
        <img src={cover} alt="product details" />
        <a href={company}>{description}</a>
      </div>
    </div>
  );
};

export default Dot;
