// Global Imports
import styled from "styled-components";

export const IconWrapper = styled.div<{
  isFed: boolean;
}>`
  filter: ${(props) => (props.isFed ? "none" : "grayScale(1)")};
`;
