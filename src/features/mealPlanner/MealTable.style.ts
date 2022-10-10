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

    .link-wrapper {
      text-align: center;
    }
    .inline-card-wrapper {
      width: 100%;
    }
  }
`;
