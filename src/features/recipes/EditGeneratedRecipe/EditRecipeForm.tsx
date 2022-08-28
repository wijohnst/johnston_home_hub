import React from "react";
import Form from "react-bootstrap/Form";

import {
  Controller,
  useFormContext,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import {
  IngredientFieldsWrapper,
  LinkIconWrapper,
} from "./EditRecipeForm.style";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { ReactComponent as LinkIcon } from "../../../assets/images/link_icon.svg";
type Props = {
  name: string;
  /** Basic string rerpresentation of an ingredient. Does not include details. IE: '6 ears corn' */
  ingredientsData: string[];
};

const EditRecipeForm = ({ name, ingredientsData }: Props) => {
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
        <Container fluid>
          {fields.map((field, index) => (
            <Row>
              <Col className="name-column" xs={5}>
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
              </Col>
              <Col className="quantity-column" xs={1}>
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
              </Col>
              <Col className="unit-column" xs={7}>
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
              </Col>
              {!ingredients[index].linkedItem && (
                <Col xs={1}>
                  <LinkIconWrapper>
                    <LinkIcon style={{ width: "24px" }} />
                  </LinkIconWrapper>
                </Col>
              )}
            </Row>
          ))}
        </Container>
      </IngredientFieldsWrapper>
    </>
  );
};

export default EditRecipeForm;
