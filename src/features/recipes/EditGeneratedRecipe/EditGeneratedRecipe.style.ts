// Global Imports
import styled from "styled-components";

export const GeneratedRecipeHeader = styled.section`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
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
  /* margin: 0 0 0 1rem; */

  button {
    margin: 1rem 0.25rem 0.25rem 0.25rem;
  }

  .delete-recipe-section {
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0.5rem 0 0 0;

    .delete-recipe-alert {
      text-align: center;
    }

    .alert-span {
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
    }
  }
`;
