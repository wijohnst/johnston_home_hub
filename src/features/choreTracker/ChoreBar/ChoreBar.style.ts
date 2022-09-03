// Global Imports
import styled from "styled-components";

export const ChoreBarWrapper = styled.div`
  margin: 0.25rem 0 0.5rem 0;
`;

export const NameCheckWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`;

export const CheckWrapper = styled.div`
  margin: 0 0 0.25rem 0;

  &:hover {
    cursor: pointer;
  }
`;

export const ProgressDatesWrapper = styled.div`
  .overdue-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-weight: 500;
      font-size: 0.75rem;
      margin: 0.25rem 0 0.25rem 0;
    }
  }
`;

export const Dates = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChoreName = styled.span`
  font-weight: 600;
`;

export const ChoreDates = styled.span`
  font-style: italic;
  font-size: 0.75rem;
`;
