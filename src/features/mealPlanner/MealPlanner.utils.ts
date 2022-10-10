import { ListGroupContent } from "../../components/SharedComponents/ButtonBar";

import { DaysOfTheWeek } from "../../constants";

/*
	! What do you need to do?

	Given a number (currentDayValue), return the correct ListGroupItem for the coescutive 7 days, including the current day.

	If we start with Sunday (0), return until Saturday (6)

	ListGroupItem = {
		text: string; // Text that is displayed in ButtonBar
  	value: ListGroupItemValue;	// value that is returned (index)
	}
*/
export const getDayOfWeekButtonBarContentByCurrentDay = (
  startDayValue: number
): ListGroupContent => {
  let listGroupContent: ListGroupContent = [];
  const dowStrings = Object.values(DaysOfTheWeek);

  dowStrings.forEach((day: DaysOfTheWeek, index: number) => {
    if (index === startDayValue) {
      listGroupContent[0] = {
        text: day,
        value: dowStrings.indexOf(day),
      };
      return;
    }
    if (index > startDayValue) {
      listGroupContent[index - 1] = {
        text: day,
        value: dowStrings.indexOf(day),
      };
      return;
    }

    if (index < startDayValue) {
      listGroupContent[dowStrings.length - index] = {
        text: day,
        value: dowStrings.indexOf(day),
      };
    }
  });
  return listGroupContent.filter((value) => value);
};
