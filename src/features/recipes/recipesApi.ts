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
    console.log("No url...");
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
  _id: string | null;
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
