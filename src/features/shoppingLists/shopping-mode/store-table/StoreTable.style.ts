import styled from "styled-components";

export const SemanticWrapper = styled.table`
  th {
    background-color: var(--primary-blue);
    color: var(--white);
    padding: 0.25rem;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .select-none {
    user-select: none;
  }
`;
