// Global Imports
import styled from "styled-components";
import Stack from "react-bootstrap/Stack";

export const PreviewRecipeWrapper = styled(Stack)`
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  border: solid thin black;
  box-shadow: 7px 4px rgba(0, 0, 0, 0.5);

  .recipe-name {
    min-width: 100%;
    font-size: 2rem;
    font-weight: 300;
  }

  .header-content-wrapper {
    margin: 0 0 1rem 0;
  }

  .recipe-content {
    margin: 0.5rem 0.5rem 0.5rem 1rem;
  }

  .heading-badge {
    width: 100%;
    /* text-align: left; */
    padding: 1rem;
  }

  .heading-text {
    font-size: 1.5rem;
    font-weight: 300;
  }
`;
