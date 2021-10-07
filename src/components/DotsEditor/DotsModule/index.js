import { indexOf } from 'lodash'
import React, { useState, useEffect, useRef } from 'react'
import DraggableDot from './DraggableDot'

export function DotsModule({ dots }) {
  const [dotsArr, setDotsArr] = useState(dots)
  const [currentDotIdx, setCurrentDotIdx] = useState(null)
  const [zIndex, setZindex] = useState(null)
  const [active, setActive] = useState(false)
  const [isDotPassingHalfScreen, setIsDotPassingHalfScren] = useState(false)

  const dragStart = (e) => {
    // this means that we have at least on child, the click isn't triggered by the parrent
    if (e.target.id !== 'dots-container' && e.target.id !== '') {
      setActive(true)

      let idx = dotsArr.findIndex((dot) => dot.id === e.target.id)
      setCurrentDotIdx(idx)

      const newDotsArr = [...dotsArr]

      newDotsArr[idx].initialX = e.clientX - newDotsArr[idx].offsetX
      newDotsArr[idx].initialY = e.clientY - newDotsArr[idx].offsetY

      setDotsArr(newDotsArr)
    }
  }

  const dragEnd = (e) => {
    if (active) {
      const newDotsArr = [...dotsArr]

      newDotsArr[currentDotIdx].initialX = newDotsArr[currentDotIdx].currentX
      newDotsArr[currentDotIdx].initialY = newDotsArr[currentDotIdx].currentX

      setDotsArr(newDotsArr)
    }

    setActive(false)
  }

  const drag = (e) => {
    if (active) {
      const newDotsArr = [...dotsArr]

      newDotsArr[currentDotIdx].currentX =
        e.clientX - newDotsArr[currentDotIdx].initialX
      newDotsArr[currentDotIdx].currentY =
        e.clientY - newDotsArr[currentDotIdx].initialY
      newDotsArr[currentDotIdx].offsetX = newDotsArr[currentDotIdx].currentX
      newDotsArr[currentDotIdx].offsetY = newDotsArr[currentDotIdx].currentY

      setDotsArr(newDotsArr)

      detectDotPosOnTheScreen(e)
    }
  }

  const detectDotPosOnTheScreen = (e) => {
    if (e.clientX > window.screen.width / 2) {
      setIsDotPassingHalfScren(true)
    } else {
      setIsDotPassingHalfScren(false)
    }
  }

  const changeDotsZindex = (e) => {
    if (e.target.id !== 'dots-container' && e.target.id !== '') {
      let initialDots = [...dotsArr]
      let idx = initialDots.findIndex((i) => i.id === e.target.id)

      // we can't use currentDotIdx because the event is triggered onHover and we do not have access on 'currentDotIdx'
      ;[initialDots[idx], initialDots[initialDots.length - 1]] = [
        initialDots[initialDots.length - 1],
        initialDots[idx],
      ]
      setDotsArr(initialDots)
    }
  }

  useEffect(() => {
    setDotsArr(dots)
  }, [dots])

  const renderDots = () =>
    dotsArr.map((dot, idx) => (
      <DraggableDot
        key={dot.id}
        currentX={dotsArr[idx].currentX}
        currentY={dotsArr[idx].currentY}
        dot={dot}
        zIndex={zIndex}
        active={active}
        isDotPassingHalfScreen={isDotPassingHalfScreen}
      />
    ))

  return (
    <div
      onMouseMove={drag}
      onMouseUp={dragEnd}
      onMouseDown={dragStart}
      //   onMouseOver={changeDotsZindex}
      id="dots-container"
      style={{
        width: '70%',
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      {dotsArr && renderDots()}
    </div>
  )
}

export default DotsModule
