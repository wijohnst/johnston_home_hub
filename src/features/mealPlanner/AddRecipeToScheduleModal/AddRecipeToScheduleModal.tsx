import React from "react";

import { useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import useFilter from "../../../hooks/useFilter";
import { fetchAllRecipes, Recipe } from "../../recipes/recipesApi";

import { AddRecipeToScheduleModalWrapper } from "./AddRecipeToScheduleModal.style";
import { MealPlanMeals } from "../mealPlannerApi";
import { LinkSpan } from "../../../components/SharedComponents/SharedComponents";

type Props = {
  isShown: boolean;
  handleHide: () => void;
  mealType: MealPlanMeals;
  handleRecipeClick: (recipeId: string) => void;
};

export const AddRecipeToScheduleModal = ({
  isShown,
  handleHide,
  mealType,
  handleRecipeClick,
}: Props) => {
  const { control, watch } = useForm();

  const {
    data: recipes = [],
    isFetching,
    isFetched,
  } = useQuery("recipes", fetchAllRecipes);

  const [{ filteredData }, { setFilterValue }] = useFilter<Recipe>(
    recipes,
    "name"
  );

  const inputValue = watch("recipes-search-term");

  React.useEffect(() => {
    setFilterValue(inputValue);
  }, [setFilterValue, inputValue]);

  return (
    <Modal show={isShown} onHide={handleHide} size="lg">
      <AddRecipeToScheduleModalWrapper>
        <h1>{`Add a ${mealType} recipe`}</h1>
        {isFetching && !isFetched && <span>Fetching recipes...</span>}
        {isFetched && (
          <>
            <Form.Group>
              <Form.Label style={{ fontWeight: 600 }}>
                Search Recipes
              </Form.Label>
              <Controller
                control={control}
                defaultValue=""
                name="recipes-search-term"
                render={({ field: { onChange, value } }) => (
                  <Form.Control type="text" value={value} onChange={onChange} />
                )}
              />
            </Form.Group>
            <Stack>
              {filteredData?.map((recipe: Recipe) => (
                <LinkSpan
                  onClick={() => handleRecipeClick(recipe._id)}
                  key={`recipe-link-${recipe._id}`}
                >
                  {recipe.name}
                </LinkSpan>
              ))}
            </Stack>
          </>
        )}
      </AddRecipeToScheduleModalWrapper>
    </Modal>
  );
};
