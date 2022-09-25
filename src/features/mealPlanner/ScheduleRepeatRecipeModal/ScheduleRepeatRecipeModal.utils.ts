import { DaysOfTheWeek } from "../../../constants";

import { ListGroupItem } from "../../../components/SharedComponents/ButtonBar";

export const getDaysOfTheWeekListGroupItems = (): ListGroupItem[] => {
  const daysOfTheWeekValues = Object.values(DaysOfTheWeek);
  return daysOfTheWeekValues.map((dayOfTheWeek: string, index: number) => ({
    text: dayOfTheWeek,
    value: index,
  }));
};
