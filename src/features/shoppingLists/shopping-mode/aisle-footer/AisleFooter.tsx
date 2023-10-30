import * as React from "react";

import { SemanticWrapper } from "./AisleFooter.style";

type Props = {
  children: React.ReactNode;
};

export const AisleFooter = ({ children }: Props): React.ReactElement => {
  return <SemanticWrapper>{children}</SemanticWrapper>;
};
