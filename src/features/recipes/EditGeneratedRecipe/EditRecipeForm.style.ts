// Global Imports
import styled from "styled-components";

import Form from "react-bootstrap/Form";

export const IngredientFieldsWrapper = styled(Form.Group)`
  background-color: lightgreen;

  .ingredient-label {
    margin: 0.5rem 0 0 0;
    font-weight: 300;
  }

  .center-label {
    display: flex;
    justify-content: center;
  }

  .name-column {
    background-color: lightblue;
  }

  .quantity-column {
    /* max-width: 15%; */
  }

  .unit-column {
    /* max-width: 25%; */
  }
`;

export const LinkIconWrapper = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 1.75rem 0 0 0;
  background-color: lightpink;
  flex-shrink: 1;

  &:hover {
    cursor: pointer;
  }
`;
