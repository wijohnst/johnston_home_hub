import React from "react";

import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import useFilter from "../../../hooks/useFilter";

import { fetchAllRecipes, Recipe } from "../recipesApi";
import { LinkSpan } from "../../../components/SharedComponents/SharedComponents";
import {
  RecipesModalWrapper,
  RecipesSearchFormWrapper,
} from "./RecipesCollectionModal.style";

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

  const { control, watch } = useForm();

  const recipeNames = recipes.map((recipe: Recipe) => recipe.name);

  const [{ filteredData }, { setFilterValue }] = useFilter<string>(recipeNames);

  const inputValue = watch("recipes-search-term");

  React.useEffect(() => {
    setFilterValue(inputValue);
  }, [inputValue, setFilterValue]);

  return (
    <Modal show={isShown} onHide={() => handleHide()}>
      <RecipesModalWrapper>
        <h1>Recipes</h1>
        {isFetching && <span>Please wait. Fetching recipes...</span>}
        {isFetched && (
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
              {filteredData?.map((recipeName: string) => (
                <LinkSpan>{recipeName}</LinkSpan>
              ))}
            </Stack>
          </RecipesSearchFormWrapper>
        )}
      </RecipesModalWrapper>
    </Modal>
  );
};

export default RecipesCollectionModal;
