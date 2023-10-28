import styled from "styled-components";

export const SemanticWrapper = styled.div<{ isActive: boolean }>`
  background-color: ${({ isActive }) =>
    isActive ? "var(--primary-blue)" : "var(--bg-light-gray)"};
  height: ${({ isActive }) => (isActive ? "2rem" : "1rem")};
  width: ${({ isActive }) => (isActive ? "2rem" : "1rem")};

  clip-path: var(--clip-path-circle);
`;
