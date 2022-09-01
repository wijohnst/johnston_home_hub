import React from "react";

import { useQuery } from "react-query";

import Modal from "react-bootstrap/Modal";
import { fetchAllRecipes, Recipe } from "../recipesApi";

type Props = {
  isShown: boolean;
  handleHide: () => void;
};

const RecipesCollectionModal = ({ isShown, handleHide }: Props) => {
  const {
    data: recipes = [],
    isFetching,
    isFetched,
  } = useQuery("recipes", fetchAllRecipes);

  const recipeNames = recipes.map((recipe: Recipe) => recipe.name);

  return (
    <Modal show={isShown} onHide={() => handleHide()}>
      <h1>Recipes</h1>
      {isFetching && <span>Please wait. Fetching recipes...</span>}
      {isFetched &&
        recipeNames.map((recipeName: string) => <span>{recipeName}</span>)}
    </Modal>
  );
};

export default RecipesCollectionModal;
