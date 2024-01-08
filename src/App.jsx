import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./components/dice.jsx";
import Dice from "./components/dice.jsx";
import FinishBoard from "./components/finishBoard.jsx";
import Timer from "./components/timer.jsx";

function App() {
  const [dice, setDice] = useState(allNewDie());
  const [finish, setFinish] = useState(false);
  const [count, setCount] = useState(0);
  const [unselectCount, setUnselectCount] = useState(0);
  const [win, setWin] = useState(false); //This is an extra state, try to remove it, convert it to a normal variable

  const ref = useRef();

  useEffect(() => {
    const firstValue = dice[0]?.value; //getting the first dice value, in order to compare it
    const allSame = dice.every((ele) =>
      firstValue ? ele.value === firstValue : false
    ); //we will use .every() method to check if all values are the same

    const allHeld = dice.every((ele) => ele.held === true); //same as the previous one, but with held value
    if (allHeld || count >= 30 || unselectCount >= 5) {
      //if all are the same then, set the finish state to true
      allNewDie();
      setFinish(true);
      if (allSame) setWin(true);
    }
  }, [dice]);

  //Note that React will re-render the component after all the completion of all the
  //state updates

  function hold(id) {
    //increaseing the counters logic here
    //we iterate over the dice, and we take the one that has an id that matches
    //the given if as a parameter. then we increase the selection count ( count )
    //if it was not held. and we increase the unselectCount otherwise
    dice.forEach((ele) => {
      if (ele.id === id) {
        if (ele.held) {
          setUnselectCount((prev) => prev + 1);
        } else setCount((prev) => prev + 1);
      }
    });

    //we find the element that has an id equal to the given id, then we flip the held
    setDice((prev) => {
      let editedDice = prev.map((ele) => {
        return ele.id === id ? { ...ele, held: !ele.held } : ele;
      });

      //Roolup() will return an array of dice, but after rolling
      //This will avoid any held object...
      return rollUp(editedDice);
    });
  }

  function allNewDie() {
    let newArr = [];

    for (let i = 0; i < 10; i++) {
      newArr.push({
        value: generateRandomValue(false),
        id: i + 1,
        held: false,
      });
    }

    return newArr;
  }

  function rollUp(dice) {
    let counter = 0,
      selectedValue,
      newRandomValue;

    /**Here I will iterate over the dice, if the current value is not held then
     * increase the count, to count the objects that are held
     * if the object is held, then store its value as the held value,
     * because we will use it to set the range of the random number
     */
    dice.forEach((ele) => {
      if (ele.held) {
        counter++;
        selectedValue = ele.value;
      }
    });

    //here I'll store first value that is selected by the player
    //to use it to calculate the range. So if the selected objects are less
    //than 1, it means it is the first value
    if (counter <= 1) ref.current = selectedValue;

    let newArr = dice.map((ele) => {
      //If there are more than 7 objects are held, then we will narrow the range
      //to give the player more opportunity to win
      if (counter >= 7) {
        newRandomValue = generateRandomValue(true, ref.current);
      } else newRandomValue = generateRandomValue(false);

      return !ele.held ? { ...ele, value: newRandomValue } : ele;
    });

    return newArr;
  }

  /**This function will return randm number
   * It accepts a boolean value to decide wheather to
   * generate a number from the 1-10 range or a custom range
   * If this was false, then it will generate a random number from 1-10
   * If this was true, it will generate a number from the range
   *  (mid-1, mid, mid+1).
   * For example, if the given number was 5, the range is  (4,5,6)
   * and if the number was 1 or 10,
   * 1 ==> The range 1,2,3
   * 10 ==> The range 8,9,10
   */
  function generateRandomValue(isRange, mid) {
    //the value to be returned, we will get random number from 1 - 10
    let value = Math.ceil(Math.random() * 10);

    //if there is no range, return the value, stop the function
    if (!isRange) return value;

    //here I will change the mid if it was in the edge
    mid = mid === 1 ? 2 : mid === 10 ? 9 : mid;

    //While the value is out of range, keep trying...
    while (value > mid + 1 || value < mid - 1) {
      //here we will get a value, from 1 to 10
      value = Math.ceil(Math.random() * 10);
    }

    return value;
  }

  function resetButton() {
    setDice(allNewDie());
    setFinish(false);
    setWin(false);
    setCount(0);
    setUnselectCount(0);
  }

  let diceElements = dice ? (
    dice.map((ele) => (
      <Dice
        key={ele.id}
        value={ele.value}
        held={ele.held}
        handleClick={() => hold(ele.id)}
      />
    ))
  ) : (
    <div>No dice yet</div>
  );

  return (
    <>
      <h1 className="title">TENZIES</h1>

      <h3 className="description">
        {" "}
        keep rolling until you make all of these the same number{" "}
      </h3>

      <div className="counter">
        Moves: {count} / 30 <br />
        Unmoves: {unselectCount} / 5 <br />
        Time: {!finish && <Timer restart={finish} />}
      </div>

      <div className="diceContainer">{diceElements}</div>

      <footer>
        <span className="me">Developed By</span> Bilal El-aney
      </footer>

      <div className="circle"></div>
      <div className="shape"></div>

      {finish && count > 0 && (
        <FinishBoard
          isWinner={win}
          count={count + unselectCount}
          handleClick={resetButton}
        />
      )}
    </>
  );
}

export default App;
