import React, { useState, useEffect, useRef } from "react";
import DraggableDot from "./DraggableDot";

export function DotsModule({ dots }) {
  const [dotsArr, setDotsArr] = useState(dots);

  const [currentDotId, setCurrentDotId] = useState(null);

  const [asd, setAsd] = useState({});

  const dotRef = useRef(null);

  let [active, setActive] = useState(false);

  
  const dragStart = (e) => {
    const actualDot = dotsArr.find((dot) => dot.id === e.target.id);

    if (actualDot) {
      const id = actualDot.id;
      setCurrentDotId(id);

      setAsd({
        ...asd,
        [id]: {
          ...asd[id],
          initialX: e.clientX - asd[id].offsetX,
          initialY: e.clientY - asd[id].offsetY,
        },
      });
    }

    if (e.target === dotRef.current) {
      setActive(true);
    }
  };

  const drag = (e) => {
    if (active) {
      setAsd({
        ...asd,
        [currentDotId]: {
          ...asd[currentDotId],
          currentX: e.clientX - asd[currentDotId].initialX,
          currentY: e.clientY - asd[currentDotId].initialY,
          offsetX: asd[currentDotId].currentX,
          offsetY: asd[currentDotId].currentY,
        },
      });
    }
  };

  const dragEnd = (e) => {
    setAsd({
      ...asd,
      [currentDotId]: {
        ...asd[currentDotId],
        initialX: asd[currentDotId].currentX,
        initialY: asd[currentDotId].currentY,
      },
    });

    setActive(false);
  };

  useEffect(() => {
    setDotsArr(dots);

    dots.map((dot) => {
      setAsd({
        ...asd,
        [dot.id]: {
          currentX: null,
          currentY: null,
          initialX: null,
          initialY: null,
          offsetX: 0,
          offsetY: 0,
        },
      });
    });
  }, [dots]);

  const renderDots = () =>
    dotsArr.map((dot) => (
      <DraggableDot
        key={dot.id}
        currentX={asd[currentDotId] && asd[currentDotId].currentX}
        currentY={asd[currentDotId] && asd[currentDotId].currentY}
        dragStart={dragStart}
        dragEnd={dragEnd}
        drag={drag}
        ref={dotRef}
        dot={dot}
        active={active}
      />
    ));

  return (
    <div
      onMouseMove={drag}
      onMouseUp={dragEnd}
      onMouseDown={dragStart}
      id="asd"
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {renderDots()}
    </div>
  );
}

export default DotsModule;
