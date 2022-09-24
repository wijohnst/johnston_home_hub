// Global Imports
import styled from "styled-components";

import { BootstrapVariant } from "../../SharedTypes";
import {
  getPrimaryColorByVariant,
  getSecondaryColorByVariant,
} from "./SharedComponents.utils";

export const ChildTooltipWrapper = styled.div`
  cursor: pointer;
  display: flex;
`;

export const ChildWrapper = styled.div`
  min-width: 24px;
`;

export const Tooltip = styled.div<{
  variant: BootstrapVariant;
}>`
  background-color: ${(props) => getPrimaryColorByVariant(props.variant)};
  color: ${(props) => getSecondaryColorByVariant(props.variant)};
  border-radius: 10px;
  padding: 0.5rem;
`;
