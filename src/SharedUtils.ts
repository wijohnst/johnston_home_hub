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

/**
 * Accepts an array of objects and a key to sort by, and returns a sorted array of unique values
 *
 * @param {T[]} values
 * @param {keyof T} targetKey
 */
export const getSortedUniqueValues = <T>(
  values: T[],
  targetKey: keyof T
): T[] => {
  const uniqueValues = values
    .reduce((acc: T[], cur: T) => {
      // if the current object's targetKey value is not in the accumulator, add it
      if (!acc.find((accItem) => accItem[targetKey] === cur[targetKey])) {
        acc.push(cur);
      }
      return acc;
    }, [])
    .sort((a, b) => (a[targetKey] > b[targetKey] ? 1 : -1));

  return uniqueValues;
};
