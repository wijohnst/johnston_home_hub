import styled from "styled-components";

export const AppWrapper = styled.section`
  padding: 0;
  margin: 0;
`;

export const WidgetWrapper = styled.section`
  border: solid thin black;
  margin: 0.25rem 0.25rem 0.25rem 0.25rem;
  border-radius: 10px 10px 10px 10px;
  padding: 0.25rem 0.25rem 0.25rem 0.25rem;
`;

export const RevealableWidgetWrapper = styled(WidgetWrapper)<{
  isRevealed: boolean;
}>`
  height: ${(props) => (props.isRevealed ? "auto" : "32%")};
  overflow: hidden;
`;
