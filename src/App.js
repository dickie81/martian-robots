import { useState, useEffect } from "react";

import Grid from "./components/Grid";
import Instructions from "./components/Instructions";
import Output from "./components/Output";

import { wait } from "./lib/utils";
import { getNewDirection, moveInDirection } from "./lib/directions";
import { createGrid, addScent } from "./lib/grid";

const App = ({ rawInstructions, timeout = 100 }) => {
  const [state, setState] = useState({
    instructions: null,
    robotList: [],
    activeRobot: null,
    output: "",
    grid: null,
    state: "idle",
  });

  const handleInstructionsSubmitted = (instructions) => {
    setState({
      ...state,
      output: "",
      instructions: instructions,
      grid: createGrid(...instructions.gridDimensions.map((d) => d + 1)),
      robotList: instructions?.robots ? instructions.robots : [],
      activeRobot: null,
    });
  };

  useEffect(() => {
    const { activeRobot, robotList, grid } = state;

    if (!activeRobot && !robotList.length) {
      if (state.state !== "idle") {
        setState({
          ...state,
          state: "idle",
        });
      }

      return;
    }

    const nextMove = async () => {
      await wait(timeout);

      if (!activeRobot?.instructions.length) {
        if (robotList.length) {
          setState({
            ...state,
            activeRobot: robotList[0],
            robotList: robotList.slice(1),
            state: "processing",
          });
          return;
        }

        setState({
          ...state,
          activeRobot: null,
        });

        return;
      }

      const nextInstruction = activeRobot.instructions[0];
      const remainingInstructions = activeRobot.instructions.slice(1);
      let newDirection = activeRobot.direction;
      let newCoordinates = [...activeRobot.coords];

      if (["L", "R"].includes(nextInstruction)) {
        newDirection = getNewDirection(activeRobot.direction, nextInstruction);
      } else if (nextInstruction === "F") {
        newCoordinates = moveInDirection(newCoordinates, activeRobot.direction);
        const origLocation = grid[activeRobot.coords[1]][activeRobot.coords[0]];

        if (origLocation.scents.includes(activeRobot.direction)) {
          newCoordinates = activeRobot.coords;
        } else if (!grid[newCoordinates[1]]?.[newCoordinates[0]]) {
          setState({
            ...state,
            output: `${state.output}${activeRobot.coords.join(" ")} ${
              activeRobot.direction
            } LOST
`,
            grid: addScent(grid, activeRobot.coords, activeRobot.direction),
            activeRobot: null,
          });

          return;
        }
      }

      setState({
        ...state,
        activeRobot: {
          direction: newDirection,
          instructions: remainingInstructions,
          coords: newCoordinates,
        },
        output:
          remainingInstructions.length === 0
            ? `${state.output}${newCoordinates.join(" ")} ${newDirection}
`
            : state.output,
      });
    };

    nextMove();
  }, [state, timeout]);

  return (
    <div className="App">
      <Instructions
        onSubmit={handleInstructionsSubmitted}
        rawInstructions={rawInstructions}
      />
      {state.instructions && (
        <Grid
          data={state.grid}
          robotPosition={
            state.activeRobot
              ? {
                  x: state.activeRobot.coords[0],
                  y: state.activeRobot.coords[1],
                  direction: state.activeRobot.direction,
                }
              : null
          }
        />
      )}
      <p role="log">{state.state}</p>
      <Output output={state.output} />
    </div>
  );
};

export default App;
