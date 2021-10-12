import React from 'react'

const Dot = ({ classes, dot }) => {
  const {
    currentX,
    currentY,
    id,
    cover,
    isDotPassingHalfScreen,
    company,
    description,
    finalLeft,
    finalTop,
  } = dot
  return (
    <div
      // style={{ transform: `translate3d(${currentX}px, ${currentY}px, 0)` }}
      style={{
        position: 'absolute',
        top: `${finalTop}%`,
        left: `${finalLeft}%`,
      }}
      className={classes.item}
      id={id}
    >
      <div
        className={`inner ${isDotPassingHalfScreen ? 'rightSide' : 'leftSide'}`}
      >
        <img src={cover} alt="product details" />
        <a href={company}>{description}</a>
      </div>
    </div>
  )
}

export default Dot
