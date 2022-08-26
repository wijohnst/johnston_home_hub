import React from "react";

import { useForm, FormProvider } from "react-hook-form";

import Button from "react-bootstrap/Button";

import { ReactComponent as EditIcon } from "../../../assets/images/edit_icon.svg";

import {
  EditIconWrapper,
  GeneratedRecipeHeader,
  Controls,
} from "./EditGeneratedRecipe.style";

import { Ingredient } from "../recipesApi";

import EditRecipeForm from "./EditRecipeForm";
import PreviewRecipe from "./PreviewRecipe";

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
  handleCancelClick: () => void;
};

type EditGeneratedRecipeFormInputs = {
  name: string;
  ingredients: Ingredient[];
  steps: string[];
};

const EditGeneratedRecipeForm = ({
  name,
  ingredients,
  steps,
  handleCancelClick,
}: Props) => {
  // Controls `readonly` state of component
  const [isEdit, setIsEdit] = React.useState(false);

  const methods = useForm<EditGeneratedRecipeFormInputs>();

  return (
    <FormProvider {...methods}>
      {isEdit ? (
        <GeneratedRecipeHeader>
          <h1>Edit New Recipe</h1>
          <EditRecipeForm />
        </GeneratedRecipeHeader>
      ) : (
        <>
          <GeneratedRecipeHeader>
            <h1>Preview New Recipe</h1>
            <EditIconWrapper onClick={() => setIsEdit(true)}>
              <EditIcon />
            </EditIconWrapper>
          </GeneratedRecipeHeader>
          <PreviewRecipe
            recipeName={name}
            ingredients={ingredients}
            steps={steps}
          />
          <Controls>
            <Button>Save Recipe</Button>
            <Button variant="danger" onClick={() => handleCancelClick()}>
              Cancel
            </Button>
          </Controls>
        </>
      )}
    </FormProvider>
  );
};

export default EditGeneratedRecipeForm;
