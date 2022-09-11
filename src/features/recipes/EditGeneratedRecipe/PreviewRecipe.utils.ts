import { Ingredient } from "../recipesApi";

export const getIngredientString = (ingredient: Ingredient): string => {
  const isCompleteIngredient = !!ingredient.quantity && !!ingredient.unit;

  if (!isCompleteIngredient) {
    return ingredient.name;
  }

  return `${ingredient.name}, ${ingredient.quantity?.toString()} ${
    ingredient.unit
  }`;
};
