import PropTypes from "prop-types";
import { useState, useEffect, useRef, memo } from "react";

/** WARNING !
 * Note that the timer will run normally unless you run the game in the
 * React's "Strict Mode" which would run each side effect twice!
 * If you tested the game on the "Strict Mode"
 * The timer would be icreasing by 2,
 * So 2 seconds corresponds to 1 second
 *    2 minutes corresponds to 1 minutes
 * Just in case you won the game after 150 minutes ;-(
 * NEVER MIND you won it within 75 minutes ;-)
 */
function Timer({ restart }) {
  const [timer, setTimer] = useState(0);
  const ref_timer = useRef(null);

  useEffect(() => {
    if (!restart) {
      ref_timer.current = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    } else {
      setTimer(0);
      return () => clearInterval(ref_timer.current);
    }
  }, [restart]);

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

//Optimization code here ...
//I will use memo so that this component (The Time Counter) will not
//be re-rendered after each time the player hits a button!
export default memo(Timer);

Timer.propTypes = {
  restart: PropTypes.bool.isRequired,
};
