import React from "react";

import { AlertHeadingWrapper } from "./AlertHeading.style";

import Alert from "react-bootstrap/Alert";
import { BootstrapVariant } from "../../SharedTypes";
import ChildTooltip from "../SharedComponents/ChildTooltip";

type Props = {
  headingText: string;
  icon: React.ReactNode;
  handleIconClick: () => void;
  variant?: BootstrapVariant;
  tooltipText: string;
};
const AlertHeading = ({
  headingText,
  icon,
  handleIconClick,
  variant = "primary",
}: Props) => {
  return (
    <AlertHeadingWrapper>
      <Alert variant={variant}>
        <div className="heading-icon-wrapper">
          <div className="icon-wrapper" onClick={handleIconClick}>
            <ChildTooltip variant={variant}>{icon}</ChildTooltip>
          </div>
          <h2>{headingText}</h2>
        </div>
      </Alert>
    </AlertHeadingWrapper>
  );
};

export default AlertHeading;
