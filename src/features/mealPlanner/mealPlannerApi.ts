import axios from "axios";

import { DefaultResponse } from "../../SharedTypes";
import { DefaultURL } from "../../constants";
import { Recipe } from "../recipes/recipesApi";

const MealPlannerURL = `${DefaultURL}/meal_plan`;

export interface RecipeDoc  {
	_id: string,
	name: string,
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
	mealType:  string;
	/** The recipes the make up the Meal */
	recipes: RecipeDoc[] | [];
	/** mongoDB version number  */
	__v: number;
}


export type TargetMealPlan = [string, MealPlanDoc[]];

export type MealPlans = { [key: string]: MealPlanDoc[] };

export interface GetMealPlansResponse extends DefaultResponse {
	mealPlans: MealPlans;
}

export const getMealPlans = async (): Promise<GetMealPlansResponse | void> => {
	try {
		const { data : { mealPlans }} = await axios.get<GetMealPlansResponse>(`${MealPlannerURL}`)	
		return {
			status: 200,
			message: "Meal Plans fetched successfully",
			mealPlans
		}
	} catch (error) {
		console.error(error)
	}
}