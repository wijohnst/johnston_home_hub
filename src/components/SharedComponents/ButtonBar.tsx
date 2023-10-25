import React from "react";

import { ButtonBarWrapper } from "./ButtonBar.style";
import ListGroup from "react-bootstrap/ListGroup";

export type ListGroupItemValue = string | number | symbol;

export interface ListGroupItem {
  text: string;
  value: ListGroupItemValue;
}

export type ListGroupContent = ListGroupItem[];

type Props = {
  isHorizontal?: boolean;
  listGroupContent: ListGroupContent;
  handleSelection: (value: ListGroupItemValue) => void;
};

const ButtonBar = ({
  isHorizontal = true,
  listGroupContent,
  handleSelection,
}: Props) => {
  return (
    <ButtonBarWrapper>
      <ListGroup
        horizontal={isHorizontal}
        defaultActiveKey={`#${String(listGroupContent[0].value)}`}
      >
        {listGroupContent.map((listGroupItem: ListGroupItem) => (
          <ListGroup.Item
            action
            onClick={() => handleSelection(listGroupItem.value)}
            href={`#${String(listGroupItem.value)}`}
            key={`${listGroupItem.text}-${String(listGroupItem.value)}`}
            style={{ textAlign: isHorizontal ? "center" : "start" }}
          >
            {listGroupItem.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </ButtonBarWrapper>
  );
};

export default ButtonBar;
