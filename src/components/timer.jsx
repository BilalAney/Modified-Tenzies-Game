/** @format */

import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function Timer({ restart, timer, setTimer }) {
  const ref_timer = useRef(null);

  useEffect(() => {
    ref_timer.current = setInterval(() => {
      setTimer((time) => time + 1);
    }, 1000);

    return () => clearInterval(ref_timer.current);
  }, []); //here there is an empty array in he dependency list, to run it once...

  //In order to format the minuts to two digits, we will add zero at the beginning, and slice the string starting from -2 (before the last digit).
  //In order to increase it every 60 seconds, we divide the number of the timer by 60, so that we get fractions number, then we get the remaining of
  //of the division operation over 60, which will be 1 if the first value was 60 ( (timer / 60 ) % 60)...
  const minutes = `0${Math.floor(timer / 60) % 60}`.slice(-2);

  //Same here with the seconds, but here we will never divide the timer over 60, we will look after the remaining
  const seconds = `0${Math.floor(timer % 60)}`.slice(-2);

  return (
    <div
      style={{ display: "inline" }}
      className="timer"
    >{`${minutes}:${seconds}`}</div>
  );
}

/**
 * I have "de-memoized" this component, Because I wanted to include the timer
 * in the FinishBoard, and to do this, I should move the timer state up, so i did it.
 * Now each second the whole app component will be re-rendered, so there is no need to memoize
 * the timer
 */

//Optimization code here ...
//I will use memo so that this component (The Time Counter) will not
//be re-rendered after each time the player hits a button!
// export default memo(Timer);

Timer.propTypes = {
  restart: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  setTimer: PropTypes.func.isRequired,
};
