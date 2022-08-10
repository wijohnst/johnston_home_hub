import React from "react";

import {
  CTASpan,
  IconWrapper,
  RevealButtonWrapper,
} from "./RevealButton.style";

import { ReactComponent as RevealIcon } from "../../assets/images/reveal_icon.svg";
import { ReactComponent as ConcealIcon } from "../../assets/images/conceal_icon.svg";

type RevealButtonText = {
  isRevealedText: string;
  isNotRevealedText: string;
};

const defaultRevealButtonText: RevealButtonText = {
  isRevealedText: "Click to hide",
  isNotRevealedText: "Click to reveal",
};

type Props = {
  ctaText?: RevealButtonText;
  isRevealed: boolean;
  handleClick: () => void;
};
const RevealButton = ({
  ctaText = defaultRevealButtonText,
  isRevealed,
  handleClick,
}: Props) => {
  return (
    <RevealButtonWrapper onClick={handleClick}>
      <CTASpan>
        {isRevealed ? ctaText.isRevealedText : ctaText.isNotRevealedText}
      </CTASpan>
      <IconWrapper>{isRevealed ? <ConcealIcon /> : <RevealIcon />}</IconWrapper>
    </RevealButtonWrapper>
  );
};

export default RevealButton;
