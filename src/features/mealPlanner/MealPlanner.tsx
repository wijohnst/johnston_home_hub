import React from "react";

import { useQuery } from "react-query";
import { getMealPlans } from "./mealPlannerApi"
import { MealPlannerWrapper } from "./MealPlanner.style";

const MealPlanner = () => {
	const {
		data : mealPlans,
		isFetching,
		isFetched : areMealPlansFetched
	} = useQuery("mealPlans", getMealPlans);

	console.log(mealPlans);
  return (
    <MealPlannerWrapper>
      <h1>Meal Planner</h1>
			{isFetching && (
				<span>Fetching Meal Plans...</span>
			)}
			{areMealPlansFetched && (
				<span>Meal Plans!</span>
			)}
    </MealPlannerWrapper>
  );
};

export default MealPlanner;
