import { Ingredient } from "../recipesApi";

/**
 * Converts raw ingredient string to default `Ingredient` object and returns all as an array
 *
 * @param {string[]} ingredientsData
 * @returns {Omit<Ingredient, "_id">[]}
 */
export const getDefaultIngredients = (
  ingredientsData: string[] | Ingredient[]
): Omit<Ingredient, "_id">[] => {
  const defaultValues = ingredientsData.map(
    (ingredient: string | Ingredient) => {
      if (typeof ingredient === "string") {
        return {
          name: ingredient,
          quantity: null,
          unit: null,
          linkedItem: null,
        };
      }

      if (
        typeof ingredient === "object" &&
        "name" in ingredient &&
        "quantity" in ingredient &&
        "unit" in ingredient &&
        "linkedItem" in ingredient
      ) {
        return {
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          linkedItem: ingredient.linkedItem,
        };
      }

      return {
        name: "",
        quantity: null,
        unit: "",
        linkedItem: "",
      };
    }
  );
  return defaultValues;
};

/**
 *	Returns a stringified version with new line characters between each array *  entry
 * @param {string[]} stepsArray
 * @returns {string}
 */
export const getStepsString = (stepsArray: string[]): string => {
  return stepsArray.reduce<string>((stepsString, currentString) => {
    return stepsString + `- ${currentString}\n`;
  }, "");
};
