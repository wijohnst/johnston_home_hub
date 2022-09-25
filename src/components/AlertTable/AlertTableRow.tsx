import React from "react";

import Stack from "react-bootstrap/Stack";

import { AlertTableRowWrapper } from "./AlertTableRow.style";
import IconAlert from "../SharedComponents/IconAlert";
import { ReactComponent as PlusIcon } from "../../assets/images/plus_icon.svg";
import { BootstrapVariant } from "../../SharedTypes";

type Props = {
  icon: React.ReactNode;
  headingText: string;
  variant?: BootstrapVariant;
  children: React.ReactNode;
};

const AlertTableRow = ({
  icon,
  headingText,
  variant = "primary",
  children,
}: Props) => {
  return (
    <AlertTableRowWrapper>
      <IconAlert
        icon={icon}
        headingText={headingText}
        handleIconClick={() => console.log("Click...")}
        tooltipText="Tooltip Text"
        variant={variant}
      />
      <Stack className="align-items-center">{children}</Stack>
    </AlertTableRowWrapper>
  );
};

export default AlertTableRow;
