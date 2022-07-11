import * as React from "react";

import { IconWrapper } from "./PetIcon.style";

interface Props {
  children: React.ReactNode;
  isFed: boolean;
}
const PetIcon = ({ children, isFed }: Props): React.ReactElement => {
  return <IconWrapper isFed={isFed}>{children}</IconWrapper>;
};

export default PetIcon;
