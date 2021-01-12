import styled from "styled-components";

const GridWrapper = styled.div`
  display: inline-block;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid black;
  margin: 2px;
  overflow: hidden;

  &.scent-N {
    border-top-color: red;
  }
  &.scent-E {
    border-right-color: red;
  }
  &.scent-S {
    border-bottom-color: red;
  }
  &.scent-W {
    border-left-color: red;
  }
`;

const Rover = styled.div`
  text-align: center;

  &.E {
    transform: rotate(90deg);
  }

  &.W {
    transform: rotate(-90deg);
  }

  &.S {
    transform: rotate(180deg);
  }
`;

const Grid = ({ data, robotPosition }) => (
  <GridWrapper>
    {[...data].reverse().map((row, index) => (
      <Row key={`row${index}`}>
        {row.map(({ x, y, scents }) => (
          <Cell
            key={`cell${x}x${y}`}
            data-x={x}
            data-y={y}
            className={scents
              .map((direction) => `scent-${direction}`)
              .join(" ")}
          >
            {robotPosition?.x === x && robotPosition?.y === y ? (
              <Rover className={robotPosition.direction}>⬆</Rover>
            ) : null}
          </Cell>
        ))}
      </Row>
    ))}
  </GridWrapper>
);

export default Grid;
