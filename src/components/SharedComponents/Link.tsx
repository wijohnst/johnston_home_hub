import React from "react";

import { LinkWrapper } from "./Link.style";
import { LinkSpan } from "./SharedComponents";
import { LinkTypes } from "../../constants";

type Props = {
  linkType?: LinkTypes;
  handleClick: () => void;
};

const Link = ({ linkType = LinkTypes.PRIMARY, handleClick }: Props) => {
  return (
    <LinkWrapper onClick={handleClick}>
      <LinkSpan linkType={linkType}>Link</LinkSpan>
    </LinkWrapper>
  );
};

export default Link;
