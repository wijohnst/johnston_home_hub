import axios from "axios";

import { DefaultResponse } from "../../SharedTypes";
import { DefaultURL } from "../../constants";

type GeneratedRecipeData = {
  name: string;
  ingredients: string[];
  steps: string[];
};
export interface GenerateRecipeResponse extends DefaultResponse {
  recipe: GeneratedRecipeData;
}

interface GenerateRecipeVariables {
  url: string;
}

export const generateRecipe = async ({
  url,
}: GenerateRecipeVariables): Promise<GeneratedRecipeData | void> => {
  if (!url) {
    return;
  } else {
    try {
      const {
        data: { recipe },
      } = await axios.post<GenerateRecipeResponse>(
        `${DefaultURL}/recipe/generate`,
        {
          url: url,
        }
      );
      return recipe;
    } catch (error) {
      console.error(error);
    }
  }
};

export interface Ingredient {
  name: string;
  quantity: number | null;
  unit: string | null;
  linkedItem: string | null;
}

export interface Recipe {
  _id: string;
  name: string;
  ingredients: Ingredient[];
  steps: string[];
  url: string | null;
}

/*
	This type represents Recipe form data before it has been persisted on the BE. 
	As such, unlike a `Recipe` type, this does not have an `_id` string.

	There is probably a more terse way of doing this that uses `Extend` but I don't know how...
*/
export type NewRecipeData = {
  name: string;
  ingredients: Ingredient[] | [];
  steps: string[];
  url: string | null;
};

export const postNewRecipe = async (
  recipeData: NewRecipeData
): Promise<DefaultResponse> => {
  try {
    const { data: defaultResponse } = await axios.post<DefaultResponse>(
      `${DefaultURL}/recipe/`,
      {
        recipeData,
      }
    );
    return defaultResponse;
  } catch (error) {
    return { status: 400, message: "Recipe failed to add." };
  }
};

interface FetchAllRecipesResponse extends DefaultResponse {
  recipes: Recipe[];
}
export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const {
      data: { recipes },
    } = await axios.get<FetchAllRecipesResponse>(`${DefaultURL}/recipe/`);
    return recipes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

interface UpdateRecipeResponse extends DefaultResponse {
  updatedRecipe: Recipe;
}

export const updateRecipe = async (
  recipeToUpdate: Recipe
): Promise<UpdateRecipeResponse | DefaultResponse> => {
  try {
    const { data: updatedRecipeResponse } = await axios.patch<
      UpdateRecipeResponse | DefaultResponse
    >(`${DefaultURL}/recipe/`, { recipeToUpdate });
    return updatedRecipeResponse;
  } catch (error) {
    return {
      status: 400,
      message: "Error updating recipe.",
    };
  }
};
