import React from "react";

import { useQuery } from "react-query";
import { getMealPlans, MealPlans } from "./mealPlannerApi"
import { MealPlannerContent, MealPlannerWrapper } from "./MealPlanner.style";
import MealTable from "./MealTable";
import { format } from "date-fns";
import DayOfWeekButtonBar from "./DayOfWeekButtonBar";
import { ListGroupContent } from "../../components/SharedComponents/ButtonBar";
import RecipesCollectionModal from "../recipes/RecipesCollectionModal/RecipesCollectionModal";

const MealPlanner = () => {
  const {
    data,
    isFetching,
    isFetched: areMealPlansFetched,
  } = useQuery("mealPlans", getMealPlans);

  const [selectedDayValue, setSelectedDayValue] = React.useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedRecipeId, setSelectedRecipeId] =
    React.useState<string | null>(null);
	const [isRecipesCollectionModalShown, setIsRecipesCollectionModalShown] = React.useState(false);

  /**
   * Accepts a `MealPlans` object  and returns a `ListGroup` for rendering a `DayOfWeekButtonBar` with the inital selection being the current day 
	 * 
   * @param {MealPlans} mealPlans
   * @returns { ListGroupContent}
   */
  const getListGroupContentFromMealPlans = (
    mealPlans: MealPlans
  ): ListGroupContent => {
    return Object.keys(mealPlans).reduce<ListGroupContent | []>(
      (listGroupArr, simplifiedDate, index) => {
        return [
          ...listGroupArr,
          {
            text: format(new Date(simplifiedDate), "EEE"),
						value: index,
          },
        ];
      },
      []
    );
  };

  return (
    <MealPlannerWrapper>
      <h1>Meal Planner</h1>
      {isFetching && !areMealPlansFetched && (
        <span>Fetching Meal Plans...</span>
      )}
      {areMealPlansFetched && data?.mealPlans && (
        <MealPlannerContent gap={3}>
          <DayOfWeekButtonBar
            listGroupContent={getListGroupContentFromMealPlans(data.mealPlans)}
            handleSelection={(value) => {
              if (typeof value === "number") {
                setSelectedDayValue(value);
              }
            }}
          />
          {}
          <MealTable
            targetMealPlan={Object.entries(data.mealPlans)[selectedDayValue]}
            handleAddClick={() => setIsRecipesCollectionModalShown(true)}
            handleRecipeSelect={(recipeId) => setSelectedRecipeId(recipeId)}
          />
        </MealPlannerContent>
      )}
			<RecipesCollectionModal isShown={isRecipesCollectionModalShown} handleHide={() => setIsRecipesCollectionModalShown(false) } />
    </MealPlannerWrapper>
  );
};

export default MealPlanner;
