// Global Imports
import styled from "styled-components";

import { LinkTypes } from "../../constants";
import { getLinkColorByType } from "./SharedComponents.utils";

export const LinkSpan = styled.span<{
  linkType?: LinkTypes;
}>`
  margin: 1rem 0 0 0;
  background: none;
  border: none;
  padding: 0;
  color: ${(props) => getLinkColorByType(props.linkType)};
  text-decoration: underline;
  cursor: pointer;
`;
