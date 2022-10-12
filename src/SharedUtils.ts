import { format } from "date-fns";

/**
 * Accepts a date and returns its Day of the Week Value, which is any whole number between 0 & 6
 *
 * @param { Date }date
 * @returns { number } dayOfTheWeekValue = int 0 - 6
 */
export const getDayOfTheWeekValueFromDate = (date: Date): number => {
  return parseInt(format(date, "i")) - 1;
};
