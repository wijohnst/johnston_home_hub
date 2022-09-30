import React from "react";
import ButtonBar, {
  ListGroupContent,
  ListGroupItemValue,
} from "../../components/SharedComponents/ButtonBar";

import { DayOfWeekButtonBarWrapper } from "./DayOfWeekButtonBar.style";

type Props = {
  listGroupContent: ListGroupContent;
  handleSelection: (value: ListGroupItemValue) => void;
};
const DayOfWeekButtonBar = ({ listGroupContent, handleSelection }: Props) => {
  return (
    <DayOfWeekButtonBarWrapper>
      <ButtonBar
        listGroupContent={listGroupContent}
        handleSelection={handleSelection}
      />
    </DayOfWeekButtonBarWrapper>
  );
};

export default DayOfWeekButtonBar;
