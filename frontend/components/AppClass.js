import React, { useState, setState } from "react";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    };
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    const xCoord = () => {
      if (this.state.index % 3 === 0) {
        return 1;
      }
      if ((this.state.index % 3) - 1 === 0) {
        return 2;
      }
      if ((this.state.index % 3) - 2 === 0) {
        return 3;
      }
    };

    const yCoord = () => {
      if (this.state.index >= 0 && this.state.index <= 2) {
        return 1;
      }
      if (this.state.index >= 3 && this.state.index <= 5) {
        return 2;
      }
      if (this.state.index >= 6 && this.state.index <= 8) {
        return 3;
      }
    };
    return `(${xCoord()}, ${yCoord()})`;
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  };
  // console.log(this.getXY())

  // getXY()
  // It it not necessary to have a state to track the coordinates.
  // It's enough to know what index the "B" is at, to be able to calculate them.

  // getXYMessage = () => {
  //   // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
  //   // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
  //   // returns the fully constructed string.
  // };

  reset = () => {
    this.setState({ index: 4 });
    // setIndex(initialIndex);
    this.setState({ steps: 0 });
    // setSteps(initialSteps);
    this.setState({ message: "" });
    // setMessage(initialMessage);
    this.setState({ email: "" });
    // setEmail(initialEmail);
    console.log(
      "reset back to index 4, steps 0, message empty, and email input empty"
    );
    // Use this helper to reset all states to their initial values.
  };

  getNextIndex = (direction) => {
    switch (direction) {
      case "up": {
        if (this.state.index <= 8 && this.state.index >= 3) {
          return this.setState({ index: this.state.index - 3 });
        } else {
          return this.state.index;
        }
        break;
      }
      case "down": {
        if (this.state.index <= 5 && this.state.index >= 0) {
          return this.setState({ index: this.state.index + 3 });
        } else {
          return this.state.index;
        }
        break;
      }
      case "left": {
        if ((this.state.index % 3) - 1 === 0) {
          return this.setState({ index: this.state.index - 1 });
        } else if ((this.state.index % 3) - 2 === 0) {
          return this.setState({ index: this.state.index - 1 });
        } else {
          return this.state.index;
        }
        break;
      }
      case "right": {
        if (this.state.index % 3 === 0) {
          return this.setState({ index: this.state.index + 1 });
        } else if ((this.state.index % 3) - 1 === 0) {
          return this.setState({ index: this.state.index + 1 });
        } else {
          return this.state.index;
        }
        break;
      }
    }
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  };

  move = (direction) => {
    const newIndex = this.getNextIndex(direction);

    switch (direction) {
      case "up": {
        if (newIndex != this.index) {
          this.setState({ index: newIndex });
          this.setState({ steps: this.state.steps + 1 });
        } else {
          this.setState({ message: this.state.message + "You can't go up" });
        }

        break;
      }
      case "down": {
        if (newIndex != this.index) {
          this.setState({ index: newIndex });
          this.setState({ steps: this.state.steps + 1 });
        } else {
          this.setState({ message: this.state.message + "You can't go down" });
        }
        break;
      }
      case "left": {
        if (newIndex != this.index) {
          this.setState({ index: newIndex });
          this.setState({ steps: this.state.steps + 1 });
        } else {
          this.setState({ message: this.state.message + "You can't go left" });
        }
        break;
      }
      case "right": {
        if (newIndex != this.index) {
          this.setState({ index: newIndex });
          this.setState({ steps: this.state.steps + 1 });
        } else {
          this.setState({ message: this.state.message + "You can't go right" });
        }
        break;
      }
    }

    // const newIndex = getNextIndex(direction);
    // switch (direction) {
    //   case "up": {
    //     if (this.newIndex != this.index) {
    //       this.setState({ index: newIndex });
    //       this.setState({ steps: steps + 1 });
    //     } else {
    //       this.setState({ message: "You can't go up" });
    //     }
    //     break;
    //   }
    //   case "down": {
    //     if (newIndex != this.index) {
    //       setIndex(newIndex);
    //       setSteps(steps + 1);
    //     } else {
    //       setMessage("You can't go down");
    //     }
    //     break;
    //   }
    //   case "left": {
    //     if (newIndex != this.index) {
    //       setIndex(newIndex);
    //       setSteps(steps + 1);
    //     } else {
    //       setMessage("You can't go left");
    //     }
    //     break;
    //   }
    //   case "right": {
    //     if (newIndex != this.index) {
    //       setIndex(newIndex);
    //       setSteps(steps + 1);
    //     } else {
    //       setMessage("You can't go right");
    //     }
    //     break;
    //   }
    // }
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  };

  onChange = (evt) => {
    // You will need this to update the value of the input.
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXY()}</h3>
          <h3 id="coordinates">Index {this.state.index}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? " active" : ""}`}
            >
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message" {...this.state.message}></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.move("left")}>
            LEFT
          </button>
          <button id="up" onClick={() => this.move("up")}>
            UP
          </button>
          <button id="right" onClick={() => this.move("right")}>
            RIGHT
          </button>
          <button id="down" onClick={() => this.move("down")}>
            DOWN
          </button>
          <button id="reset" onClick={() => this.reset()}>
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
}
