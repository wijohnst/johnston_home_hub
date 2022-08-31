import React from "react";

import { useForm, FormProvider } from "react-hook-form";

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
import { getDefaultIngredients, getStepsString } from "./EditRecipeForm.utils";
import { Ingredient } from "../recipesApi";

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
  ingredients: string[];
  steps: string[];
  url: string | null;
  handleCancelClick: () => void;
};

type FormValues = {
  name: string;
  ingredients: Omit<Ingredient, "_id">[] | [];
  steps: string;
  url: string | null;
};

const EditGeneratedRecipeForm = ({
  name,
  ingredients,
  steps,
  url,
  handleCancelClick,
}: Props) => {
  // Controls `readonly` state of component
  const [isEdit, setIsEdit] = React.useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      name: name,
      ingredients: getDefaultIngredients(ingredients),
      steps: getStepsString(steps),
      url: url,
    },
  });

  const onSubmit = (formData: any) => {
    if (isEdit) {
      console.log("EDIT", formData);
    }

    if (!isEdit) {
      console.log("NOT EDIT", formData);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        {isEdit ? (
          <>
            <GeneratedRecipeHeader>
              <h1>Edit New Recipe</h1>
            </GeneratedRecipeHeader>
            <EditRecipeForm name={name} ingredientsData={ingredients} />
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
              ingredients={ingredients}
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
