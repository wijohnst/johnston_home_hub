import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import { RecipeName } from "./PreviewRecipe.style";
type Props = {
  recipeName: string;
  ingredients: string[];
  steps: string[];
};

const PreviewRecipe = ({ recipeName, ingredients, steps }: Props) => {
  return (
    <Container fluid>
      <Row>
        <h2>
          <Badge bg="success" pill>
            Name
          </Badge>
        </h2>
      </Row>
      <Row style={{ marginLeft: "1rem" }}>
        <RecipeName>{recipeName}</RecipeName>
      </Row>
      <Row>
        <h2>
          <Badge bg="success" pill>
            Ingredients
          </Badge>
        </h2>
      </Row>
      <Row style={{ marginLeft: "1rem" }}>
        <ul>
          {ingredients.map((ingredient: string) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      </Row>
      <Row>
        <h2>
          <Badge bg="success" pill>
            Steps
          </Badge>
        </h2>
      </Row>
      <Row style={{ marginLeft: "1rem" }}>
        <ol>
          {steps.map((step: string) => (
            <li>{step}</li>
          ))}
        </ol>
      </Row>
    </Container>
  );
};

export default PreviewRecipe;
