import styled from "styled-components";

export const SemanticWrapper = styled.table`
  width: 100%;

  th {
    background-color: var(--primary-blue);
    color: var(--white);
    padding: 0.25rem;
  }

  tr {
    border-top: solid thin black;
    border-bottom: solid thin black;
  }

  tfoot {
    text-align: right;

    span {
      color: var(--white);
    }
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .select-none {
    user-select: none;
  }
`;

export const ItemName = styled.div`
  span {
    margin: 0 0 0 0.5rem;
  }
`;

export const ItemQuantity = styled.div`
  text-align: center;
`;

export const ItemActions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;

  margin: 0 1rem 0 0;

  svg {
    height: 2rem;
    width: 2rem;

    margin: 0.5rem 0.5rem 0.5rem 0.5rem;

    cursor: pointer;
  }
`;
