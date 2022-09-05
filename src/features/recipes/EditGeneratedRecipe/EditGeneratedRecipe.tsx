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
import { Ingredient, NewRecipeData, postNewRecipe } from "../recipesApi";

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
  name: string;
  ingredients: string[] | Ingredient[];
  steps: string[];
  url: string | null;
  isManualEntry?: boolean;
  handleCancelClick: () => void;
  handleNewRecipePostSuccess: () => void;
};

type FormValues = {
  name: string;
  ingredients: Omit<Ingredient, "_id">[] | [];
  steps: { text: string }[];
  url: string | null;
};

const EditGeneratedRecipeForm = ({
  name,
  ingredients,
  steps,
  url,
  isManualEntry = false,
  handleCancelClick,
  handleNewRecipePostSuccess,
}: Props) => {
  // Controls `readonly` state of component
  const [isEdit, setIsEdit] = React.useState(false);

  const queryClient = useQueryClient();

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

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    const stepsArray = formData.steps.map((stepsObject) => stepsObject.text);
    const postRequestData = {
      ...formData,
      steps: stepsArray,
    };
    postNewRecipeMutation.mutate(postRequestData);
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
                (ingredient: string | Omit<Ingredient, "_id">) => {
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
          <Button type="submit">Save Recipe</Button>
          <Button variant="danger" onClick={() => handleCancelClick()}>
            Cancel
          </Button>
        </Controls>
      </Form>
    </FormProvider>
  );
};

export default EditGeneratedRecipeForm;
