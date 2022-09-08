// Global Imports
import styled from "styled-components";

import Form from "react-bootstrap/Form";

export const FormWrapper = styled.section`
  .link-span {
    margin: 1rem 0 0 0;
    background: none;
    border: none;
    padding: 0;
    color: #069;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const IngredientFieldsWrapper = styled(Form.Group)`
  margin: 0 1rem 0 0;

  .ingredient-alert-string {
    margin: 0 0 0 0.25rem;
    font-weight: 800;
  }
  .ingredient-label {
    margin: 0.5rem 0 0 0;
    font-weight: 300;
  }

  .center-label {
    text-align: center;
  }

  .name-column {
    flex-grow: 1;
  }

  .quantity-column {
    flex-shrink: 1;
    max-width: 10%;
  }

  .unit-column {
    flex-grow: 1;
  }

  .link-column {
    flex-shrink: 1;

    &:hover {
      cursor: pointer;
    }
  }

  .link-item-section {
    margin: 1rem 0.25rem 0 0;
  }

  .link-inputs-wrapper {
    align-items: flex-end;

    .link-item-controls {
      display: flex;
      width: 100%;

      button {
        margin: 0.25rem;
      }
    }
  }

  .add-ingredient-link {
    margin: 1rem 0 0 0;
  }

  .link-sub-form {
    margin: 0 0 0 1rem;

    .sub-form-controls {
      button {
        margin: 0.25rem;
      }
    }
  }

  .delete-icon {
    cursor: pointer;
  }
`;

export const StepsFieldsWrapper = styled(Form.Group)`
  margin: 1rem 1rem 0 0;

  .number-input-wrapper {
    margin: 0 0 1rem 0;

    span {
      margin: 0 0.5rem 0 0;
    }
    .step-input {
    }
  }
`;
