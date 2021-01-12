import { useState } from "react";
import styled from "styled-components";

import { parseInstructions } from "../../lib/instructions";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const InstructionsArea = styled.textarea`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  appearance: none;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  padding: 0;
  border: 1px solid black;
  appearance: none;
`;

const Instructions = ({ onSubmit }) => {
  const [instructions, setInstructions] = useState("");

  const handleInstructionsChange = (evt) => {
    setInstructions(() => evt.target.value);
  };

  const handleSendButtonClick = () => {
    try {
      const parsedInstructions = parseInstructions(instructions);

      onSubmit(parsedInstructions);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Wrapper>
      <InstructionsArea
        onChange={handleInstructionsChange}
        data-testid="instructions"
      />
      <SendButton onClick={handleSendButtonClick}>SEND INSTRUCTIONS</SendButton>
    </Wrapper>
  );
};

export default Instructions;
