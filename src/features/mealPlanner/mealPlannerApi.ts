import axios from "axios";

import { DefaultResponse } from "../../SharedTypes";
import { DefaultURL } from "../../constants";
import { Recipe } from "../recipes/recipesApi";

const MealPlannerURL = `${DefaultURL}/meal_plan`;

export enum MealPlanMeals {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
}

export interface RecipeDoc {
  _id: string;
  name: string;
}
/**
 * mongoDB document for a MealPlan
 */
export interface MealPlanDoc {
  /** mongoDB UUID */
  _id: string;
  /** Stringified JS Date */
  date: string;
  /** What kind of meal is this? */
  mealType: MealPlanMeals | string;
  /** The recipes the make up the Meal */
  recipes: RecipeDoc[] | [];
  /** mongoDB document version number  */
  __v: number;
}

export type UpdatedMeal = {
  _id: string;
  date: string;
  mealType: string;
  recipes: string[];
};

export type TargetMealPlan = [string, MealPlanDoc[]];

export type MealPlans = { [key: string]: MealPlanDoc[] };
export interface GetMealPlansResponse extends DefaultResponse {
  mealPlans: MealPlans;
}

/*
	* WHAT DO YOU NEED TO DO?
 
 		1 - Fetch an array of `LockedRecipe` object from the BE
			//a. Define `LockedRecipe` interface
			//b. Define `FetchLockedRecipeReturn` type
			// c. Write axios fetch function
			d. Add React-Querty query to `MealPlanner` on load
*/

export interface LockedRecipeDoc {
  /** mongoDB UUID */
  _id: string;
  /** UUID reference to a Recipe document */
  recipeId: string;
  /** What kind of meal is this? */
  mealType: MealPlanMeals;
  /** Which day should this recipe be "locked" to? Days are represented by an interger between 0 - 6 */
  daysLocked: number[];
  /** mongoDB document version number */
  __v: number;
}

export interface FetchLockedRecipeResponse extends DefaultResponse {
  lockedRecipes: LockedRecipeDoc[];
}

/**
 * Returns an array of `LockedRecipeDoc` objects
 *
 * @returns {FetchLockedRecipeResponse}
 */
export const fetchLockedRecipes =
  async (): Promise<FetchLockedRecipeResponse> => {
    try {
      const { data } = await axios.get<FetchLockedRecipeResponse>(
        `${MealPlannerURL}/locked_recipes`
      );
      return {
        status: data.status,
        message: data.message,
        lockedRecipes: data.lockedRecipes,
      };
    } catch (error) {
      return {
        status: 400,
        message: "Something went wrong",
        lockedRecipes: [],
      };
    }
  };

export const getMealPlans = async (): Promise<GetMealPlansResponse | void> => {
  try {
    const {
      data: { mealPlans },
    } = await axios.get<GetMealPlansResponse>(`${MealPlannerURL}`);
    return {
      status: 200,
      message: "Meal Plans fetched successfully",
      mealPlans,
    };
  } catch (error) {
    console.error(error);
  }
};

export const updateMealPlan = async (
  updatedMeal: UpdatedMeal
): Promise<DefaultResponse | void> => {
  try {
    const { data: defaultResponse } = await axios.patch<DefaultResponse>(
      "http://localhost:3001/meal_plan/meal",
      { updatedMeal }
    );
    return defaultResponse;
  } catch (error) {
    console.error(error);
  }
};
