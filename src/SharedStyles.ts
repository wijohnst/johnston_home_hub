import styled from "styled-components";

export const SubmitButton = styled.div`
  margin: 1rem 0 0 0;

  button {
    margin: 0.25rem;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;

  input:first-child {
    width: fit-content;
    margin: 0 0.25rem 0 0;
  }

  span {
    width: fit-content;
    margin: 0 0 0 0.25rem;
    font-size: 0.75rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
