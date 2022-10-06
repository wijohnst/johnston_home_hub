import React from "react";

import { MealTableWrapper, MealTableRows } from "./MealTable.style";
import AlertTableRow from "../../components/AlertTable/AlertTableRow";

import { ReactComponent as PlusIcon } from "../../assets/images/plus_icon.svg";
import { getSecondaryColorByVariant } from "../../components/SharedComponents/SharedComponents.utils";
import { MealPlanDoc, TargetMealPlan, RecipeDoc } from "./mealPlannerApi";
import Link from '../../components/SharedComponents/Link';

type Props = {
	targetMealPlan: TargetMealPlan
	handleAddClick: () => void;
};

/**
 * Returns a clickable link for each RecipeDoc in a MealPlan
 * 
 * @param recipes {RecipeDoc[]}
 * @returns {React.ReactNode}
 */
const renderRecipes = (recipes : RecipeDoc[]): React.ReactNode => {
	return (
		<>
			{recipes.map((recipe: RecipeDoc) => <Link key={`recipe-${recipe._id}`} linkText={recipe.name} handleClick={() => console.log(recipe._id)} />)}
		</>
	)
}

const renderTableRows = (mealPlans : MealPlanDoc[], handleAddClick : () => void) : React.ReactNode => {
	return (
    <MealTableRows>
      {mealPlans.map((mealPlanDoc: MealPlanDoc) => (
        <AlertTableRow
          icon={<PlusIcon fill={getSecondaryColorByVariant("primary")} />}
          variant="primary"
          toolTipText={`Add to ${mealPlanDoc.mealType}`}
          headingText={mealPlanDoc.mealType.toUpperCase()}
          handleIconClick={handleAddClick}
					key={`mealTableRow-${mealPlanDoc._id}`}
        >
					<div className="row-child-wrapper">
          {mealPlanDoc.recipes.length <= 0 ? (
              <Link
                linkText={`Add ${mealPlanDoc.mealType} recipe`}
                handleClick={handleAddClick}
              />
							) : renderRecipes(mealPlanDoc.recipes)
					}
					</div>
        </AlertTableRow>
      ))}
    </MealTableRows>
  );
}

const MealTable = ({targetMealPlan, handleAddClick}: Props) => {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_targetDate, mealPlans] = targetMealPlan;

  return (
    <MealTableWrapper>
			{renderTableRows(mealPlans, handleAddClick)}
    </MealTableWrapper>
  );
};

export default MealTable;
