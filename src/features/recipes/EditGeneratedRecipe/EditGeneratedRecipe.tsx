import React from "react";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { ReactComponent as EditIcon } from "../../../assets/images/edit_icon.svg";

import {
  EditIconWrapper,
  GeneratedRecipeHeader,
  Controls,
} from "./EditGeneratedRecipe.style";

import EditRecipeForm from "./EditRecipeForm";
import PreviewRecipe from "./PreviewRecipe";
import { getDefaultIngredients } from "./EditRecipeForm.utils";
import {
  Recipe,
  Ingredient,
  NewRecipeData,
  postNewRecipe,
  updateRecipe,
} from "../recipesApi";

/*
	TWO COMPONENT STATES:
	- Preview - readonly mode 
	- Edit - Update data scraped from original website and link to `GroceryItem` / create new `GroceryItem` and link
*/
/*
 WHAT DO YOU NEED TO DO? 
	- Create a new form that has input=type[text] for all `ingredient` strings in `ingredients`
	- For each ingredient 
	- Add an input=type[textfield] with a default value of steps[] <- concat into single string?
	`
 */
type Props = {
  /** What is the recipe name? */
  name: string;
  /** What are the known ingredients for the recipe? */
  ingredients: string[] | Ingredient[];
  /** What are the known steps for the recipe? */
  steps: string[];
  /** What is the URL used to generate the recipe? */
  url: string | null;
  /** Is the recipe being entered manually, ie: not generated from a link? */
  isManualEntry?: boolean;
  /** What is the recipe's UUID in the database? */
  recipeId: string | null;
  /** What should happen when the user clicks the `Cancel` button? */
  handleCancelClick: () => void;
  /** What should happen when a new recipe is successfully poseted to the backend? */
  handleNewRecipePostSuccess?: () => void;
  /** What should happen when a recipe is successfully updated? */
  handleRecipeUpdateSuccess?: (updatedRecipe: Recipe) => void;
};

type FormValues = {
  name: string;
  ingredients: Ingredient[] | [];
  steps: { text: string }[];
  url: string | null;
};

const EditGeneratedRecipeForm = ({
  name,
  ingredients,
  steps,
  url,
  isManualEntry = false,
  recipeId,
  handleCancelClick,
  handleNewRecipePostSuccess = () => {},
  handleRecipeUpdateSuccess = () => {},
}: Props) => {
  // Controls `readonly` state of component
  const [isEdit, setIsEdit] = React.useState(false);

  const queryClient = useQueryClient();

  const isUpdateRecipe = React.useMemo(() => {
    return !!recipeId;
  }, [recipeId]);

  const methods = useForm<FormValues>({
    defaultValues: {
      name: name,
      ingredients: getDefaultIngredients(ingredients),
      steps: steps.map((stepText) => ({
        text: stepText,
      })),
      url: url,
    },
  });

  const postNewRecipeMutation = useMutation(
    "postNewRecipe",
    (recipeData: NewRecipeData) => {
      return postNewRecipe(recipeData);
    },
    {
      onSuccess: () => {
        handleNewRecipePostSuccess();
        queryClient.invalidateQueries("recipes");
      },
    }
  );

  const updateRecipeMutation = useMutation(
    "updateRecioe",
    (recipeToUpdate: Recipe) => {
      return updateRecipe(recipeToUpdate);
    },
    {
      onSuccess: (data) => {
        if ("updatedRecipe" in data) {
          const { updatedRecipe } = data;
          console.log("EDITGENERATEDRECIPE", updatedRecipe);
          handleRecipeUpdateSuccess(updatedRecipe);
          queryClient.invalidateQueries("recipes");
        }
      },
    }
  );

  /*
		Dynamic submission handlers based on use case.

		If not updating, POST new recipe. 

		If updating, PATCH existing recipe. 
	*/
  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    const stepsArray = formData.steps.map((stepsObject) => stepsObject.text);
    const postRequestData = {
      ...formData,
      steps: stepsArray,
    };

    !isUpdateRecipe && postNewRecipeMutation.mutate(postRequestData);

    if (isUpdateRecipe) {
      const recipeToUpdate: Recipe = {
        _id: recipeId ?? "",
        name: formData.name,
        ingredients: formData.ingredients,
        steps: stepsArray,
        url: formData.url,
      };

      updateRecipeMutation.mutate(recipeToUpdate);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {isEdit || isManualEntry ? (
          <>
            <GeneratedRecipeHeader>
              <h1>Edit New Recipe</h1>
            </GeneratedRecipeHeader>
            <EditRecipeForm name={name} />
          </>
        ) : (
          <>
            <GeneratedRecipeHeader>
              <h1>Preview New Recipe</h1>
              <EditIconWrapper onClick={() => setIsEdit(true)} role="button">
                <EditIcon />
              </EditIconWrapper>
            </GeneratedRecipeHeader>
            <PreviewRecipe
              recipeName={name}
              ingredients={ingredients.map(
                (ingredient: string | Ingredient) => {
                  if (typeof ingredient === "string") {
                    return ingredient;
                  }

                  if (typeof ingredient === "object" && "name" in ingredient) {
                    return ingredient.name;
                  }

                  return "";
                }
              )}
              steps={steps}
            />
          </>
        )}
        <Controls>
          <Button type="submit">
            {isUpdateRecipe ? "Update Recipe" : "Save Recipe"}
          </Button>
          <Button variant="danger" onClick={() => handleCancelClick()}>
            Cancel
          </Button>
        </Controls>
      </Form>
    </FormProvider>
  );
};

export default EditGeneratedRecipeForm;
