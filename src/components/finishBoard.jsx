/** @format */

import "../index.css";
import PropTypes from "prop-types";
import ReactConfetti from "react-confetti";

export default function FinishBoard(props) {
  //In order to format the minuts to two digits, we will add zero at the beginning, and slice the string starting from -2 (before the last digit).
  //In order to increase it every 60 seconds, we divide the number of the timer by 60, so that we get fractions number, then we get the remaining of
  //of the division operation over 60, which will be 1 if the first value was 60 ( (timer / 60 ) % 60)...
  const minutes = `0${Math.floor(props.timer / 60) % 60}`.slice(-2);

  //Same here with the seconds, but here we will never divide the timer over 60, we will look after the remaining
  const seconds = `0${Math.floor(props.timer % 60)}`.slice(-2);

  return (
    <>
      {props.isWinner && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="overlay"></div>
      <div className="board">
        {(props.isWinner && (
          <h1 className="winner">WINNER WINNER, MEAT DINNER</h1>
        )) || (
          <h1 className="loser">YOU'RE LOSER, YOU DID NOT WIN A MEAT DINNER</h1>
        )}
        <h3>Time: {`${minutes}:${seconds}`}</h3>
        <h3>Total Moves: {props.count}</h3>
        <button className="reset" onClick={props.handleClick}>
          PLAY AGAIN!
        </button>
      </div>
    </>
  );
}

FinishBoard.propTypes = {
  count: PropTypes.number.isRequired,
  isWinner: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};
