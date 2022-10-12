// Global Imports
import styled from "styled-components";

import Stack from "react-bootstrap/Stack";

export const MealTableWrapper = styled.div``;

export const MealTableRows = styled(Stack)`
  .row-child-wrapper {
    margin: 0 0 1rem 0;
    width: 100%;
  }

  .row-recipe-wrapper {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    .tooltip-link-wrapper {
      display: flex;
      margin: 0.5rem 0 0.5rem;
    }

    .icon-wrapper {
      height: 24px;
      width: 24px;
      margin: 0 0.25rem 0 0;
    }

    .link-wrapper {
      width: clamp(25%, 25%, 100%);
    }

    .inline-card-wrapper {
      width: 100%;
    }
  }
`;
