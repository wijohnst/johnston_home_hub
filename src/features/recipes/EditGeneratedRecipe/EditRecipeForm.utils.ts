import { Ingredient } from "../recipesApi";

/**
 * Converts raw ingredient string to default `Ingredient` object and returns all as an array
 *
 * @param {string[]} ingredientsData
 * @returns {Omit<Ingredient, "_id">[]}
 */
export const getDefaultIngredients = (
  ingredientsData: string[]
): Omit<Ingredient, "_id">[] => {
  return ingredientsData.map((ingredientString: string) => ({
    name: ingredientString,
    quantity: null,
    unit: null,
    linkedItem: null,
  }));
};
