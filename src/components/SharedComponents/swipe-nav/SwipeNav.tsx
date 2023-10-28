import * as React from "react";

import { SemanticWrapper } from "./SwipeNav.style";

import { SwipeIndicator } from "../swipe-indicator/SwipeIndicator";

type Props = {
  swipeIndicators: boolean[];
};

export const SwipeNav = ({ swipeIndicators = [false, true, false] }: Props) => {
  return (
    <SemanticWrapper>
      {swipeIndicators.map((isActive, index) => (
        <SwipeIndicator key={index} isActive={isActive} />
      ))}
    </SemanticWrapper>
  );
};
