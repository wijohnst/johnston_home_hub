// Global Imports
import styled from "styled-components";

export const GeneratedRecipeHeader = styled.section`
  display: flex;
  align-items: center;
`;

export const EditIconWrapper = styled.div`
  height: 24px;
  width: 24px;
  margin: 0 0 0 1rem;
  position: relative;
  bottom: 0.25rem;

  &:hover {
    cursor: pointer;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: felx-start;
  margin: 0 0 0 1rem;

  button {
    margin: 0 0.25rem 0 0;
  }
`;
