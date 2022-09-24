import React from "react";

import { LinkWrapper } from "./Link.style";
import { LinkSpan } from "./SharedComponents";
import { LinkTypes } from "../../constants";

type Props = {
  linkType?: LinkTypes;
  linkText: string;
  handleClick: () => void;
};

const Link = ({
  linkType = LinkTypes.PRIMARY,
  linkText,
  handleClick,
}: Props) => {
  return (
    <LinkWrapper onClick={handleClick}>
      <LinkSpan linkType={linkType}>{linkText}</LinkSpan>
    </LinkWrapper>
  );
};

export default Link;
