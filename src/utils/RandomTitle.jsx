import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";

//TODO - optimize the component - too much rerendering;

export default function RandomTitle({ title, children }) {
  const newStr = title.split("");

  const [final, setFinal] = useState(title);
  let [timer, setTimer] = useState(0);
  let [interval, setDefaultInterval] = useState(null);

  let randomizer = [];

  const randomIndexBasedOnStrLen = () => {
    for (let i = 0; i < newStr.length; i++) {
      let rndm = Math.floor(Math.random() * newStr.length);
      randomizer.push(rndm);
    }
  };

  const displayRandomUx = () => {
    setTimer((timer += 1));
    let final = "";
    for (let i of randomizer) {
      final += newStr[i];
    }
    setFinal(final);
    randomizer = [];
  };

  const generateRandomStr = () => {
    randomIndexBasedOnStrLen();
    displayRandomUx();

    // reset timer:D
    if (timer === 5) {
      clearInterval(interval);
      setTimer(0);
      setDefaultInterval(null);
      setFinal(title);
    }
  };

  const startIntervalTimer = () => {
    if (interval === null) {
      interval = setInterval(generateRandomStr, 40);
      setDefaultInterval(interval);
    }
  };

  //   useEffect(() => {
  //     startIntervalTimer();
  //   }, [title]);

  return (
    <>
      <div onMouseEnter={startIntervalTimer} color="primary" variant="h4" component="h4" style={{ color: "aqua" }}>
        <Typography variant="h4" component="h4" style={{ color: "aqua" }}>
          {final}
        </Typography>
        {children}
      </div>
    </>
  );
}
