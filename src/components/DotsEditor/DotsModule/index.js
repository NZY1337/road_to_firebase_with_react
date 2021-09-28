import React, { useState, useEffect, useRef } from "react";
import DraggableDot from "./DraggableDot";

export function DotsModule({ dots }) {
  const [dotsArr, setDotsArr] = useState(dots);

  const [currentDotId, setCurrentDotId] = useState(null);

  const [asd, setAsd] = useState({});

  const dotRef = useRef(null);

  let [active, setActive] = useState(false);

  const dragStart = (e) => {
    // this means that we have at least on child, the click isn't triggered by the parrent

    if (e.target.id !== "asd") {
      setActive(true);
      const id = e.target.id;
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
    active &&
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
        currentX={asd[dot.id].currentX}
        currentY={asd[dot.id].currentY}
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
      {dotsArr && renderDots()}
    </div>
  );
}

export default DotsModule;
