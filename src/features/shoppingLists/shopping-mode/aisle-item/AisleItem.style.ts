import styled from "styled-components";

export const SemanticWrapper = styled.td<{ isHidden: boolean }>`
  filter: ${({ isHidden }) => (isHidden ? "grayscale()" : "none")};
  opacity: ${({ isHidden }) => (isHidden ? "0.5" : "1")};
  text-decoration: ${({ isHidden }) => (isHidden ? "line-through" : "none")};
`;
