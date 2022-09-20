import React from "react";

import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import useFilter from "../../../hooks/useFilter";

import { fetchAllRecipes, Recipe } from "../recipesApi";
import { LinkSpan } from "../../../components/SharedComponents/SharedComponents";
import {
  RecipesModalWrapper,
  RecipesSearchFormWrapper,
} from "./RecipesCollectionModal.style";
import PreviewRecipe from "../EditGeneratedRecipe/PreviewRecipe";

import { ReactComponent as EditIcon } from "../../../assets/images/edit_icon.svg";
import EditGeneratedRecipe from "../EditGeneratedRecipe/EditGeneratedRecipe";
import { getIngredientString } from "../EditGeneratedRecipe/PreviewRecipe.utils";

type Props = {
  isShown: boolean;
  handleHide: () => void;
};

const RecipesCollectionModal = ({ isShown, handleHide }: Props) => {
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(
    null
  );
  const [isEdit, setIsEdit] = React.useState(false);

  const {
    data: recipes = [],
    isFetching,
    isFetched,
  } = useQuery("recipes", fetchAllRecipes);

  const { control, watch } = useForm();

  const [{ filteredData }, { setFilterValue }] = useFilter<Recipe>(
    recipes,
    "name"
  );

  const inputValue = watch("recipes-search-term");

  React.useEffect(() => {
    setFilterValue(inputValue);
  }, [inputValue, setFilterValue]);

  return (
    <Modal
      show={isShown}
      onHide={() => [handleHide(), setSelectedRecipe(null)]}
      size="lg"
    >
      <RecipesModalWrapper>
        {!selectedRecipe && <h1>Recipes</h1>}
        {isFetching && <span>Please wait. Fetching recipes...</span>}
        {isFetched && !selectedRecipe && (
          <RecipesSearchFormWrapper>
            <Form.Group>
              <Form.Label style={{ fontWeight: 600 }}>
                Search Recipes
              </Form.Label>
              <Controller
                control={control}
                name="recipes-search-term"
                render={({ field: { onChange, value } }) => (
                  <Form.Control type="text" value={value} onChange={onChange} />
                )}
              />
            </Form.Group>
            <Stack className="links-wrapper">
              {filteredData?.map((recipe: Recipe) => (
                <LinkSpan onClick={() => setSelectedRecipe(recipe)}>
                  {recipe.name}
                </LinkSpan>
              ))}
            </Stack>
          </RecipesSearchFormWrapper>
        )}
        {selectedRecipe && !isEdit && (
          <div>
            <div className="header-wrapper">
              <h1>View Recipe</h1>
              <div className="edit-icon-wrapper">
                <EditIcon role="button" onClick={() => setIsEdit(true)} />
              </div>
            </div>
            <PreviewRecipe
              recipeName={selectedRecipe.name}
              ingredients={selectedRecipe.ingredients.map((ingredient) =>
                getIngredientString(ingredient)
              )}
              steps={selectedRecipe.steps}
            />
            <div className="view-recipe-controls">
              <Button onClick={() => setSelectedRecipe(null)}>
                Back to Recipes
              </Button>
            </div>
          </div>
        )}
        {selectedRecipe && isEdit && (
          <div>
            <EditGeneratedRecipe
              name={selectedRecipe.name}
              ingredients={selectedRecipe.ingredients}
              steps={selectedRecipe.steps}
              url={selectedRecipe.url}
              recipeId={selectedRecipe._id}
              handleCancelClick={() => setIsEdit(false)}
              isManualEntry={true}
              handleRecipeUpdateSuccess={(updatedRecipe: Recipe) => [
                setIsEdit(false),
                setSelectedRecipe(updatedRecipe),
              ]}
              handleDeleteRecipeSuccess={() => setSelectedRecipe(null)}
            />
          </div>
        )}
      </RecipesModalWrapper>
    </Modal>
  );
};

export default RecipesCollectionModal;
