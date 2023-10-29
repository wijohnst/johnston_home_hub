import * as React from "react";

import { SemanticWrapper } from "./AisleHeading.style";

import { ReactComponent as CaretIcon } from "../../../../assets/images/carret_icon.svg";

type Props = {
  aisleName: string;
  iconCount: number;
  isOpen: boolean;
  handleCaretClick: () => void;
};

export const AisleHeading = ({
  aisleName,
  iconCount = 0,
  isOpen = false,
  handleCaretClick,
}: Props) => {
  return (
    <SemanticWrapper isOpen={isOpen}>
      <div className="header-content">
        <h2>{aisleName}</h2>
        <div className="header-content__icons">
          <div
            className="header-content__icons__caret"
            onClick={handleCaretClick}
          >
            <CaretIcon />
          </div>
          <div className="header-content__icons__count">
            <span>{iconCount}</span>
          </div>
        </div>
      </div>
    </SemanticWrapper>
  );
};
