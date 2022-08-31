import { RegularExpressions } from "../../../constants";
/**
 * Accepts a concatenated string representing all steps from a recipe and returns
 * those steps as an array
 *
 * @param {string} stepsString
 * @returns {string[]}
 */
export const parseStepsString = (stepsString: string): string[] => {
  const trimmedString = stepsString.trim();
  const hasNewLine = !!trimmedString.match(RegularExpressions.newLine);
  const hasHyphen = !!trimmedString.match(RegularExpressions.hyphen);

  if (hasNewLine) {
    const ingredientStrings = trimmedString
      .split(RegularExpressions.newLine)
      .map((ingredientString) =>
        ingredientString
          .replace(RegularExpressions.specialCharacters, "")
          .trim()
      );

    return ingredientStrings;
  } else {
    if (hasHyphen) {
      const ingredientStrings = trimmedString
        .split(RegularExpressions.hyphen)
        .map((ingredientString) => ingredientString.trim())
        .filter((ingredientString) => ingredientString !== "");

      return ingredientStrings;
    } else {
      return [trimmedString];
    }
  }
};
