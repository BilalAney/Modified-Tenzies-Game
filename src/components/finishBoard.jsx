import "../index.css";
import PropTypes from "prop-types";
import ReactConfetti from "react-confetti";

export default function FinishBoard(props) {
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
};
