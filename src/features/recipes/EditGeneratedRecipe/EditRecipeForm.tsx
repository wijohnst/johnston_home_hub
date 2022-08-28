import React from "react";
import Form from "react-bootstrap/Form";

import {
  Controller,
  useFormContext,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import { IngredientFieldsWrapper } from "./EditRecipeForm.style";

import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { ReactComponent as LinkIcon } from "../../../assets/images/link_icon.svg";
type Props = {
  name: string;
  /** Basic string rerpresentation of an ingredient. Does not include details. IE: '6 ears corn' */
  ingredientsData: string[];
};

const EditRecipeForm = ({ name, ingredientsData }: Props) => {
  const [targetIngredientIndex, setTargetIngredientIndex] = React.useState<
    number | null
  >(null);

  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: "ingredients",
  });

  const ingredients = useWatch({
    control,
    name: "ingredients",
  });

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: 600 }}>Recipe Name</Form.Label>
        <Container>
          <Controller
            control={control}
            defaultValue={name}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Form.Control type="text" value={value} onChange={onChange} />
            )}
          />
        </Container>
      </Form.Group>
      <IngredientFieldsWrapper>
        <Form.Label style={{ fontWeight: 600 }}>Ingredients</Form.Label>
        {fields.map((field, index) => (
          <>
            <Stack direction="horizontal" gap={2}>
              <div className="ingredient-label center-label name-column">
                <Form.Label className="ingredient-label">Name</Form.Label>
                <Controller
                  control={control}
                  name={`ingredients[${index}].name`}
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      placeholder="Please enter an ingredient name."
                    />
                  )}
                />
              </div>
              <div className="ingredient-label center-label quantity-column">
                <Form.Label className="ingredient-label center-label">
                  Quantity
                </Form.Label>
                <Controller
                  control={control}
                  name={`ingredients[${index}].quantity`}
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div className="ingredient-label center-label">
                <Form.Label className="ingredient-label center-label">
                  Unit
                </Form.Label>
                <Controller
                  control={control}
                  name={`ingredients[${index}].unit`}
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      placeholder="Please enter a unit."
                    />
                  )}
                />
              </div>
              {!ingredients[index].linkedItem && (
                <div
                  className="link-column"
                  onClick={() => setTargetIngredientIndex(index)}
                >
                  <Form.Label className="ingredient-label center-label"></Form.Label>
                  <div>
                    <LinkIcon style={{ width: "24px" }} />
                  </div>
                </div>
              )}
            </Stack>
            {targetIngredientIndex === index && (
              <div className="link-item-section">
                <Stack gap={1}>
                  <Alert>
                    <h5>Link a Grocery Item to this Ingredient</h5>
                    <p>
                      This allows integration between your recipes and your
                      shopping lists. Linked items will be added to your
                      shopping list whenever a recipe is added to your meal
                      schedule.
                    </p>
                  </Alert>
                  <Form.Label>Grocery Item to Link</Form.Label>
                </Stack>
              </div>
            )}
          </>
        ))}
      </IngredientFieldsWrapper>
    </>
  );
};

export default EditRecipeForm;
