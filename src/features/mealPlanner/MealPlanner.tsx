import React from "react";

import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getMealPlans,
  MealPlanMeals,
  MealPlans,
  updateMealPlan,
  MealPlanDoc,
  UpdatedMeal,
  RecipeDoc,
  fetchLockedRecipes,
} from "./mealPlannerApi";
import { MealPlannerContent, MealPlannerWrapper } from "./MealPlanner.style";
import MealTable from "./MealTable";
import { format } from "date-fns";
import DayOfWeekButtonBar from "./DayOfWeekButtonBar";
import { ListGroupContent } from "../../components/SharedComponents/ButtonBar";
import { AddRecipeToScheduleModal } from "./AddRecipeToScheduleModal/AddRecipeToScheduleModal";
import { fetchAllRecipes, Recipe, getRecipesById } from "../recipes/recipesApi";
import { LockedRecipe } from "./InlineRecipeCard/InlineRecipeCard.stories";

const MealPlanner = () => {
  const [selectedDayValue, setSelectedDayValue] = React.useState(0);
  const [selectedRecipeId, setSelectedRecipeId] =
    React.useState<string | null>(null);
  const [targetMealPlanDoc, setTargetMealPlanDoc] =
    React.useState<MealPlanDoc | null>(null);
  const [targetRecipe, setTargetRecipe] = React.useState<Recipe | null>(null);

  const queryClient = useQueryClient();

  const {
    data: mealPlansData,
    isFetching: areMealPlansFetching,
    isFetched: areMealPlansFetched,
  } = useQuery("mealPlans", getMealPlans);

  const { data: recipes = [] } = useQuery("recpies", fetchAllRecipes);

  const { data: lockedRecipesData, isFetched: areLockedRecipesFetched } =
    useQuery("lockedRecipesData", fetchLockedRecipes);

  const { data: lockedRecipes } = useQuery("lockedRecipes", () => {
    const lockedRecipeDocIds = new Set(
      lockedRecipesData?.lockedRecipes.map(
        (lockedRecipeDoc) => lockedRecipeDoc.recipeId
      )
    );

    return getRecipesById(Array.from(lockedRecipeDocIds));
  });

  const updateMealPlanMutation = useMutation(
    "updateMealPlanMutation",
    (updatedMeal: UpdatedMeal) => {
      return updateMealPlan(updatedMeal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("mealPlans");
        setTargetMealPlanDoc(null);
      },
    }
  );

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

  const parseMealPlanDoc = (mealPlanDoc: MealPlanDoc): UpdatedMeal => ({
    _id: mealPlanDoc._id,
    date: mealPlanDoc.date,
    mealType: mealPlanDoc.mealType,
    recipes: mealPlanDoc.recipes.map((recipeDoc: RecipeDoc) => recipeDoc._id),
  });

  React.useEffect(() => {
    if (selectedRecipeId && recipes.length !== 0) {
      const [selectedRecipe] = recipes.filter(
        (recipe: Recipe) => recipe._id === selectedRecipeId
      );
      setTargetRecipe(selectedRecipe);
    }
  }, [selectedRecipeId, recipes]);

  return (
    <MealPlannerWrapper>
      <h1>Meal Planner</h1>
      {areMealPlansFetching && !areMealPlansFetched && (
        <span>Fetching Meal Plans...</span>
      )}
      {areMealPlansFetched &&
        mealPlansData?.mealPlans &&
        areLockedRecipesFetched &&
        lockedRecipesData?.lockedRecipes && (
          <MealPlannerContent gap={3}>
            <DayOfWeekButtonBar
              listGroupContent={getListGroupContentFromMealPlans(
                mealPlansData.mealPlans
              )}
              handleSelection={(value) => {
                if (typeof value === "number") {
                  setSelectedDayValue(value);
                }
              }}
            />
            <MealTable
              targetMealPlan={
                Object.entries(mealPlansData.mealPlans)[selectedDayValue]
              }
              handleAddClick={(targetMealPlan) =>
                setTargetMealPlanDoc(targetMealPlan)
              }
              handleRecipeSelect={(recipeId) => setSelectedRecipeId(recipeId)}
              selectedRecipe={targetRecipe}
              handleRecipeClose={() => [
                setTargetRecipe(null),
                setSelectedRecipeId(null),
              ]}
              lockedRecipes={lockedRecipesData?.lockedRecipes}
            />
          </MealPlannerContent>
        )}
      <AddRecipeToScheduleModal
        isShown={!!targetMealPlanDoc}
        handleHide={() => setTargetMealPlanDoc(null)}
        mealType={MealPlanMeals.BREAKFAST}
        handleRecipeClick={(recipeId) => {
          if (targetMealPlanDoc) {
            const parsedTargetMealPlan = parseMealPlanDoc(targetMealPlanDoc);
            updateMealPlanMutation.mutate({
              ...parsedTargetMealPlan,
              recipes: [...parsedTargetMealPlan.recipes, recipeId],
            });
          }
        }}
      />
    </MealPlannerWrapper>
  );
};

export default MealPlanner;
