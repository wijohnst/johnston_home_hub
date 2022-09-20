import React from "react";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { ReactComponent as EditIcon } from "../../../assets/images/edit_icon.svg";
import { ReactComponent as BackIcon } from "../../../assets/images/carret_icon.svg";

import {
  IconWrapper,
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
  deleteRecipe,
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
  /** What should happen when a recipe is sucessfully deleted? */
  handleDeleteRecipeSuccess?: () => void;
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
  handleDeleteRecipeSuccess = () => {},
}: Props) => {
  // Controls `readonly` state of component
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);

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
          handleRecipeUpdateSuccess(updatedRecipe);
          queryClient.invalidateQueries("recipes");
        }
      },
    }
  );

  const deleteRecipeMutation = useMutation(
    "deleteNewRecipe",
    () => {
      return deleteRecipe(recipeId ?? "");
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("recipes");
        handleDeleteRecipeSuccess();
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

  const handleDelete = () => {
    deleteRecipeMutation.mutate();
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {isEdit || isManualEntry ? (
          <>
            <GeneratedRecipeHeader>
              <IconWrapper className="back-icon-wrapper">
                <BackIcon onClick={() => handleCancelClick()} />
              </IconWrapper>
              <h1>Edit New Recipe</h1>
            </GeneratedRecipeHeader>
            <EditRecipeForm name={name} />
          </>
        ) : (
          <>
            <GeneratedRecipeHeader>
              <h1>Preview New Recipe</h1>
              <IconWrapper onClick={() => setIsEdit(true)} role="button">
                <EditIcon />
              </IconWrapper>
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
          {((isEdit && !isDelete) || (!isDelete && isManualEntry)) && (
            <>
              <Button type="submit">
                {isUpdateRecipe ? "Update Recipe" : "Save Recipe"}
              </Button>
              {recipeId && (
                <Button variant="danger" onClick={() => setIsDelete(true)}>
                  Delete Recipe
                </Button>
              )}
            </>
          )}
          {isDelete && (
            <section className="delete-recipe-section">
              <Alert variant="danger" className="delete-recipe-alert">
                <span className="alert-span">
                  Are you sure you want to delete this recipe?
                </span>
              </Alert>
              <div>
                <Button variant="danger" onClick={() => handleDelete()}>
                  Delete Recipe
                </Button>
                <Button onClick={() => setIsDelete(false)}>Cancel</Button>
              </div>
            </section>
          )}
        </Controls>
      </Form>
    </FormProvider>
  );
};

export default EditGeneratedRecipeForm;
