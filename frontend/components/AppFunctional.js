import React, { useState } from "react";

// 0, 1, 2, 3, 4, 5, 6, 7, 8

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  function getXY() {
    const xCoord = () => {
      if (index % 3 === 0) {
        return 1;
      }
      if ((index % 3) - 1 === 0) {
        return 2;
      }
      if ((index % 3) - 2 === 0) {
        return 3;
      }
    };

    const yCoord = () => {
      if (index >= 0 && index <= 2) {
        return 1;
      }
      if (index >= 3 && index <= 5) {
        return 2;
      }
      if (index >= 6 && index <= 8) {
        return 3;
      }
    };
    return `(${xCoord()}, ${yCoord()})`;
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    // ***DONE***
  }
  getXY();

  // function getXYMessage() {
  //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
  //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
  //   // returns the fully constructed string.
  // }

  function reset() {
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
    console.log(
      "reset back to index 4, steps 0, message empty, and email input empty"
    );

    // Use this helper to reset all states to their initial values.
    // ***DONE***
  }

  function getNextIndex(direction) {
    // let newDirection = index;
    switch (direction) {
      case "up": {
        setIndex(index - 3);
        setSteps(steps + 1);
        break;
      }
      case "down": {
        setIndex(index + 3);
        setSteps(steps + 1);
        break;
      }
      case "left": {
        setIndex(index - 1);
        setSteps(steps + 1);
        break;
      }
      case "right": {
        setIndex(index + 1);
        setSteps(steps + 1);
        break;
      }
    }

    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //
  }

  function move(e) {
    // setIndex(e.target.id);
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY()}</h3>
        <h3 id="coordinates">Index {index}</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === 4 ? " active" : ""}`}>
            {idx === 4 ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset" onClick={() => reset()}>
          reset
        </button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
