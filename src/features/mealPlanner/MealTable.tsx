import React from "react";

import { MealTableWrapper } from "./MealTable.style";
import AlertTableRow from "../../components/AlertTable/AlertTableRow";

import { ReactComponent as PlusIcon } from "../../assets/images/plus_icon.svg";
import { getSecondaryColorByVariant } from "../../components/SharedComponents/SharedComponents.utils";

type Props = {};

const MealTable = ({}: Props) => {
  return (
    <MealTableWrapper>
      <AlertTableRow
        icon={<PlusIcon fill={getSecondaryColorByVariant("primary")} />}
        variant="primary"
        toolTipText="Add Recipe to Breakfast"
        headingText="Breakfast"
      >
        !
      </AlertTableRow>
      <AlertTableRow
        icon={<PlusIcon fill={getSecondaryColorByVariant("primary")} />}
        variant="primary"
        toolTipText="Add Recipe to Lunch"
        headingText="Lunch"
      >
        !
      </AlertTableRow>
      <AlertTableRow
        icon={<PlusIcon fill={getSecondaryColorByVariant("primary")} />}
        variant="primary"
        toolTipText="Add Recipe to Dinner"
        headingText="Dinner"
      >
        !
      </AlertTableRow>
      <AlertTableRow
        icon={<PlusIcon fill={getSecondaryColorByVariant("primary")} />}
        variant="primary"
        toolTipText="Add Recipe to Snacks"
        headingText="Snacks"
      >
        !
      </AlertTableRow>
    </MealTableWrapper>
  );
};

export default MealTable;
