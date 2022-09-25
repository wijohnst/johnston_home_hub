import React from "react";

import {
  ChildTooltipWrapper,
  ChildWrapper,
  Tooltip,
} from "./ChildTooltip.style";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { BootstrapVariant, BootstrapPlacement } from "../../SharedTypes";

type Props = {
  children?: React.ReactNode;
  placement?: BootstrapPlacement;
  variant?: BootstrapVariant;
  tooltipText?: string;
};

const ChildTooltip = ({
  children = "Hover to see a tooltip",
  placement = "right",
  variant = "primary",
  tooltipText = "Tooltip",
}: Props) => {
  const renderChild = (props: any) => (
    <Tooltip variant={variant} {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <ChildTooltipWrapper>
      <OverlayTrigger
        overlay={renderChild}
        delay={{ show: 250, hide: 400 }}
        placement={placement}
      >
        <ChildWrapper>{children}</ChildWrapper>
      </OverlayTrigger>
    </ChildTooltipWrapper>
  );
};

export default ChildTooltip;
