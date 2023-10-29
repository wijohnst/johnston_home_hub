import styled from "styled-components";

export const SemanticWrapper = styled.div<{
  isOpen: boolean;
}>`
  width: 100%;
  background-color: var(--primary-blue);
  color: white;

  h2 {
    margin: 0 0 0 0.25rem;
    flex: 1;
  }

  .header-content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  .header-content__icons {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;

    min-width: 5rem;
  }

  .header-content__icons__caret {
    height: 1.5rem;
    width: 1.5rem;
    background-color: var(--white);
    clip-path: var(--clip-path-circle);

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      height: 1rem;
      width: 1rem;
      rotate: ${({ isOpen }) => (isOpen ? "-90deg" : "90deg")};
    }
  }

  .header-content__icons__count {
    height: 1.5rem;
    width: 1.5rem;
    background-color: var(--primary-green);
    clip-path: var(--clip-path-circle);
    text-align: center;

    span {
      color: white;
      font-weight: 800;
    }
  }
`;
