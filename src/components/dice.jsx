
import '../index.css'
import PropTypes from "prop-types";

export default function Dice({value, held, handleClick}) {

  return (
    
      <div className={`square ${held ? "held" : "notHeld"}`} onClick={handleClick}>
      <span className="number">
        {value}
      </span>
    </div>

    

  )

}


Dice.propTypes = {
  value: PropTypes.number.isRequired,
  held: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
