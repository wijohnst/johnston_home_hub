import axios from "axios";

import { DefaultResponse } from "../../SharedTypes";
import { DefaultURL } from "../../constants";

type GeneratedRecipeData = {
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
