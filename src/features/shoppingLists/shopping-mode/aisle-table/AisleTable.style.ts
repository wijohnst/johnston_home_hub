import styled from "styled-components";

export const SemanticWrapper = styled.table`
  width: 100%;

  th {
    background-color: var(--primary-blue);
    color: var(--white);
    padding: 0.25rem;
  }

  tbody {
    tr {
      border-top: solid thin black;
      border-bottom: solid thin black;
    }

    tr:last-of-type {
      border-bottom: none;
    }
  }

  tfoot {
    text-align: right;

    th {
      background-color: var(--bg-light-blue);
      border: none;
      height: clamp(20px, 2rem, 200px);
    }

    span {
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
