import * as React from "react";
import { SemanticWrapper } from "./SwipeIndicator.style";

type Props = {
  isActive: boolean;
};
export const SwipeIndicator = ({ isActive = false }: Props) => {
  return <SemanticWrapper isActive={isActive} />;
};
