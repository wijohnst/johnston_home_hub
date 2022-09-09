/* eslint-disable @typescript-eslint/no-unused-vars */
import { current } from "@reduxjs/toolkit";

/**
 * Returns the length of the longest array in the supplied tuple
 *
 * @param {string[][]} propertyValueArrs
 * @returns number
 */
export const getLongestStringLength = (propertyValueArrs: string[][]): number =>
  propertyValueArrs.reduce((longestValueArr, currentValueArr) => {
    if (currentValueArr.length > longestValueArr.length) {
      return currentValueArr;
    } else {
      return longestValueArr;
    }
  }, propertyValueArrs[0]).length;

export const getClosestMatch = (
  inputValueArray: string[],
  propertyValuesArrs: string[][]
): string[] | void => {
  const longestStringLength = getLongestStringLength(propertyValuesArrs);

  interface ClosestMatch {
    numberOfMatchingCharacters: number;
    propertyValuesArr: string[];
  }

  const closestMatch = propertyValuesArrs.reduce<ClosestMatch>(
    (closestMatchAcc, valuesArr) => {
      let closestMatchObject = closestMatchAcc
        ? closestMatchAcc
        : { numberOfMatchingCharacters: 0, propertyValuesArr: [] };

      const currentMatchingCharacters = valuesArr.reduce<number[]>(
        (acc, cur, index) => {
          if (
            inputValueArray[index] &&
            inputValueArray[index].toLowerCase() === cur.toLowerCase()
          ) {
            return [...acc, 1];
          } else {
            return acc;
          }
        },
        []
      );

      //@ts-ignore
      const matchingSum = currentMatchingCharacters.reduce<number>(
        (sum, cur) => {
          return sum + cur;
        },
        0
      );

      if (closestMatchAcc.numberOfMatchingCharacters < matchingSum) {
        return {
          numberOfMatchingCharacters: matchingSum,
          propertyValuesArr: valuesArr,
        };
      } else {
        return closestMatchObject;
      }
    },
    { numberOfMatchingCharacters: 0, propertyValuesArr: [] }
  );

  if (closestMatch.propertyValuesArr.length < inputValueArray.length) {
    return [];
  }
  return closestMatch.propertyValuesArr;
};

/**
 * Checks for complete string or substring equivalence
 *
 * @param {string} inputString
 * @param {string} comparisonString
 * @returns {boolean}
 */
export const stringsAreEquivalent = (
  inputString: string,
  comparisonString: string
): boolean => {
  const stringsAreEqualLength = inputString.length === comparisonString.length;

  if (stringsAreEqualLength) {
    return inputString.toLowerCase() === comparisonString.toLowerCase();
  } else {
    const comparisonSubString = comparisonString.slice(0, inputString.length);
    return (
      inputString.toLowerCase() === comparisonSubString.toLocaleLowerCase()
    );
  }
};

export const getSuggestedString = (
  inputString: string,
  comparisonStrings: string[]
): string | undefined =>
  comparisonStrings.find((possibleSuggestion) =>
    stringsAreEquivalent(inputString, possibleSuggestion)
  );
