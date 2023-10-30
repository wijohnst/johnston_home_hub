import * as React from "react";

type Props = {
  children: React.ReactNode;
};

import { SemanticWrapper } from "./AisleItem.style";

export const AisleItem = ({ children }: Props): React.ReactElement => {
  return <SemanticWrapper>{children}</SemanticWrapper>;
};
