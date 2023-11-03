import axios from "axios";
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
  }

  function getNextIndex(direction) {
    switch (direction) {
      case "up": {
        if (index <= 8 && index >= 3) {
          return index - 3;
        } else {
          return index;
        }
        break;
      }
      case "down": {
        if (index <= 5 && index >= 0) {
          return index + 3;
        } else {
          return index;
        }
        break;
      }

      case "left": {
        if ((index % 3) - 1 === 0) {
          return index - 1;
        } else if ((index % 3) - 2 === 0) {
          return index - 1;
        } else {
          return index;
        }
        break;
      }
      case "right": {
        if (index % 3 === 0) {
          return index + 1;
        } else if ((index % 3) - 1 === 0) {
          return index + 1;
        } else {
          return index;
        }
        break;
      }
    }

    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    //
  }

  function move(direction) {
    const newIndex = getNextIndex(direction);

    switch (direction) {
      case "up": {
        if (newIndex != index) {
          setIndex(newIndex);
          setSteps(steps + 1);
        } else {
          setMessage("You can't go up");
        }

        break;
      }
      case "down": {
        if (newIndex != index) {
          setIndex(newIndex);
          setSteps(steps + 1);
        } else {
          setMessage("You can't go down");
        }
        break;
      }
      case "left": {
        if (newIndex != index) {
          setIndex(newIndex);
          setSteps(steps + 1);
        } else {
          setMessage("You can't go left");
        }
        break;
      }
      case "right": {
        if (newIndex != index) {
          setIndex(newIndex);
          setSteps(steps + 1);
        } else {
          setMessage("You can't go right");
        }
        break;
      }
    }
    // if (direction === "up") {
    //   return getNextIndex();
    // } else {
    //   setMessage("You can't go up");
    //   setIndex(index);
    //   setSteps(steps);
    // }

    // if (index >= 0 && index <= 2) {
    //   setMessage(initialMessage);
    // } else {
    //   return "You can't go up";
    // }

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value);
    console.log(email);
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    evt.preventDefault();

    function convertCoordinatesFromStringToNumbers(coordinatesString) {
      const [xString, yString] = coordinatesString.slice(1, -1).split(",");

      const x = parseFloat(xString);
      const y = parseFloat(yString);

      return { x, y };
    }

    const coordinatesString = getXY();
    const coordinates =
      convertCoordinatesFromStringToNumbers(coordinatesString);
    console.log(coordinates.x);
    console.log(coordinates.y);

    fetch("http://localhost:9000/api/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        x: coordinates.x,
        y: coordinates.y,
        steps: steps,
        email: email,
      }),
    })
      .then((resp) => {
        resp.json();
        // console.log(resp);
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
    // .finally((res) => {
    //   console.log(res.message);
    // });

    //   // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY()}</h3>
        <h3 id="coordinates">Index {index}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move("left")}>
          LEFT
        </button>
        <button id="up" onClick={() => move("up")}>
          UP
        </button>
        <button id="right" onClick={() => move("right")}>
          RIGHT
        </button>
        <button id="down" onClick={() => move("down")}>
          DOWN
        </button>
        <button id="reset" onClick={() => reset()}>
          reset
        </button>
      </div>
      <form onSubmit={(evt) => onSubmit(evt)}>
        <input
          onChange={(evt) => onChange(evt)}
          id="email"
          value={email}
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
