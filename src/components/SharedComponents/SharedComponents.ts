// Global Imports
import styled from "styled-components";

import { BootstrapVariant } from "../../SharedTypes";
import { getSecondaryColorByVariant } from "./SharedComponents.utils";

export const LinkSpan = styled.span<{
  linkType?: BootstrapVariant;
}>`
  margin: 1rem 0 0 0;
  background: none;
  border: none;
  padding: 0;
  color: ${(props) => getSecondaryColorByVariant(props.linkType)};
  text-decoration: underline;
  cursor: pointer;
`;
