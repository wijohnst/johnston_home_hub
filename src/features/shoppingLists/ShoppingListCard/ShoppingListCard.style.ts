// Global Imports
import styled from "styled-components";

import Badge from "react-bootstrap/Badge";

export const ShoppingListCardWrapper = styled.div`
  margin: 0.5rem 0 0.5rem 0;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const ShareIconWrapper = styled.div`
  height: 1rem;
  width: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0rem 1rem 0rem 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export const StoreButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 0.5rem 0;
  span {
    margin: 0 1rem 0 0;
  }
`;

export const StoresHeading = styled.span`
  font-weight: 400;
`;

export const EditListLink = styled.span`
  font-weight: 400;
  font-size: 0.85rem;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
`;

export const EditItemBadge = styled(Badge)`
  &:hover {
    cursor: pointer;
  }
`;

export const SubmitButton = styled.div`
  margin: 1rem 0 1rem 0;
`;
