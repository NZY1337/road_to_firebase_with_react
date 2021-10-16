import React from 'react'

const Dot = ({ classes, dot, type }) => {
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

  const determineIfPresentationOrEditor =
    type === 'presentation'
      ? {
          position: 'absolute',
          top: `${finalTop}%`,
          left: `${finalLeft}%`,
        }
      : { transform: `translate3d(${currentX}px, ${currentY}px, 0)` }

  return (
    <div
      style={determineIfPresentationOrEditor}
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
