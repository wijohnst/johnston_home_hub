import React from "react";

import { MealTableWrapper, MealTableRows } from "./MealTable.style";
import AlertTableRow from "../../components/AlertTable/AlertTableRow";

import { ReactComponent as PlusIcon } from "../../assets/images/plus_icon.svg";
import { getSecondaryColorByVariant } from "../../components/SharedComponents/SharedComponents.utils";
import { MealPlanDoc, TargetMealPlan, RecipeDoc } from "./mealPlannerApi";
import Link from "../../components/SharedComponents/Link";
import { Recipe } from "../recipes/recipesApi";
import InlineRecipeCard from "./InlineRecipeCard/InlineRecipeCard";

type Props = {
  targetMealPlan: TargetMealPlan;
  handleAddClick: (mealPlan: MealPlanDoc) => void;
  handleRecipeSelect: (recipeId: string) => void;
  selectedRecipe: Recipe | null;
  handleRecipeClose: () => void;
};

const MealTable = ({
  targetMealPlan,
  handleAddClick,
  handleRecipeSelect,
  selectedRecipe = null,
  handleRecipeClose,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_targetDate, mealPlans] = targetMealPlan;

  /**
   * Returns a clickable link for each RecipeDoc in a MealPlan
   *
   * @param recipes {RecipeDoc[]}
   * @returns {React.ReactNode}
   */
  const renderRecipes = (recipes: RecipeDoc[]): React.ReactNode => {
    return (
      <div className="row-recipe-wrapper">
        {recipes.map((recipe: RecipeDoc) => (
          <>
            <div className="link-wrapper">
              <Link
                key={`recipe-${recipe._id}`}
                linkText={recipe.name}
                handleClick={() =>
                  selectedRecipe
                    ? handleRecipeClose()
                    : handleRecipeSelect(recipe._id)
                }
              />
            </div>
            <div className="inline-card-wrapper">
              {selectedRecipe && selectedRecipe._id === recipe._id && (
                <InlineRecipeCard
                  selectedRecipe={selectedRecipe}
                  handleLockedRecipeClick={() =>
                    console.log("Locked recipe clicked...")
                  }
                  handleRecipeClick={() => console.log("Recipe clicked...")}
                  isRecipeLocked={false}
                />
              )}
            </div>
          </>
        ))}
      </div>
    );
  };

  const renderTableRows = (): React.ReactNode => {
    return (
      <MealTableRows>
        {mealPlans.map((mealPlanDoc: MealPlanDoc) => (
          <AlertTableRow
            icon={<PlusIcon fill={getSecondaryColorByVariant("primary")} />}
            variant="primary"
            toolTipText={`Add to ${mealPlanDoc.mealType}`}
            headingText={mealPlanDoc.mealType.toUpperCase()}
            handleIconClick={() => handleAddClick(mealPlanDoc)}
            key={`mealTableRow-${mealPlanDoc._id}`}
          >
            <div className="row-child-wrapper">
              {mealPlanDoc.recipes.length <= 0 ? (
                <Link
                  linkText={`Add ${mealPlanDoc.mealType} recipe`}
                  handleClick={() => handleAddClick(mealPlanDoc)}
                />
              ) : (
                renderRecipes(mealPlanDoc.recipes)
              )}
            </div>
          </AlertTableRow>
        ))}
      </MealTableRows>
    );
  };
  return <MealTableWrapper>{renderTableRows()}</MealTableWrapper>;
};

export default MealTable;
