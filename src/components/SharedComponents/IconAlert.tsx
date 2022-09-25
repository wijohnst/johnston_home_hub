import React from "react";

import { IconAlertWrapper } from "./IconAlert.style";

import Alert from "react-bootstrap/Alert";
import { BootstrapVariant } from "../../SharedTypes";
import ChildTooltip from "./ChildTooltip";

type Props = {
  headingText: string;
  icon: React.ReactNode;
  handleIconClick: () => void;
  variant?: BootstrapVariant;
  tooltipText: string;
};
const IconAlert = ({
  headingText,
  icon,
  handleIconClick,
  variant = "primary",
  tooltipText,
}: Props) => {
  return (
    <IconAlertWrapper>
      <Alert variant={variant}>
        <div className="heading-icon-wrapper">
          <div className="icon-wrapper" onClick={handleIconClick}>
            <ChildTooltip variant={variant} tooltipText={tooltipText}>
              {icon}
            </ChildTooltip>
          </div>
          <h2>{headingText}</h2>
        </div>
      </Alert>
    </IconAlertWrapper>
  );
};

export default IconAlert;
