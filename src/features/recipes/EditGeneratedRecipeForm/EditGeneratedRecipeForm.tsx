import React from "react";
import { useForm } from "react-hook-form";

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
  ingredients: string[];
  steps: string[];
};
const EditGeneratedRecipeForm = ({ ingredients, steps }: Props) => {
  return (
    <>
      <h1>Edit New Recipe</h1>
    </>
  );
};

export default EditGeneratedRecipeForm;
