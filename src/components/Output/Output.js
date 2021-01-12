import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const OutputArea = styled.textarea`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  appearance: none;
  box-sizing: border-box;
`;

const Output = ({ output }) => (
  <Wrapper>
    <OutputArea readOnly value={output} data-testid="output" />
  </Wrapper>
);

export default Output;
