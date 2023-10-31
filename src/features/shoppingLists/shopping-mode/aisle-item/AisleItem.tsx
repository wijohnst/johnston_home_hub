import * as React from "react";

import { SemanticWrapper } from "./AisleItem.style";

type Props = {
  children: React.ReactNode;
  isHidden: boolean;
};

export const AisleItem = ({
  children,
  isHidden = false,
}: Props): React.ReactElement => {
  return <SemanticWrapper isHidden={isHidden}>{children}</SemanticWrapper>;
};
