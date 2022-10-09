import React from "react";
import { Recipe } from "../../recipes/recipesApi";

import Button from "react-bootstrap/Button";

import PreviewRecipe from "../../recipes/EditGeneratedRecipe/PreviewRecipe";

import { InlineRecipeCardWrapper } from "./InlineRecipeCard.style";
import { getIngredientString } from "../../recipes/EditGeneratedRecipe/PreviewRecipe.utils";

type Props = {
  selectedRecipe: Recipe;
  isRecipeLocked: boolean;
  handleLockedRecipeClick: () => void;
  handleRecipeClick: () => void;
};
const InlineRecipeCard = ({
  selectedRecipe,
  isRecipeLocked = false,
  handleLockedRecipeClick,
  handleRecipeClick,
}: Props) => {
  type Control = {
    buttonText: string;
    handleClick: () => void;
  };

  const controls = React.useMemo((): Control => {
    if (isRecipeLocked) {
      return {
        buttonText: "Change Frequenecy",
        handleClick: handleLockedRecipeClick,
      };
    }

    return {
      buttonText: "Schedule Repeat",
      handleClick: handleRecipeClick,
    };
  }, [isRecipeLocked, handleRecipeClick, handleLockedRecipeClick]);

  return (
    <InlineRecipeCardWrapper>
      <PreviewRecipe
        recipeName={selectedRecipe.name}
        ingredients={selectedRecipe.ingredients.map((ingredient) =>
          getIngredientString(ingredient)
        )}
        steps={selectedRecipe.steps}
      />
      <section className="controls">
        <Button variant="danger">Remove</Button>
        <Button variant="primary" onClick={controls.handleClick}>
          {controls.buttonText}
        </Button>
      </section>
    </InlineRecipeCardWrapper>
  );
};

export default InlineRecipeCard;
