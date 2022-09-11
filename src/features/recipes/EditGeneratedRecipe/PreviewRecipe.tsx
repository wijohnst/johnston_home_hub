import React from "react";

import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

import { PreviewRecipeWrapper } from "./PreviewRecipe.style";
type Props = {
  recipeName: string;
  ingredients: string[];
  steps: string[];
};

const PreviewRecipe = ({ recipeName, ingredients, steps }: Props) => {
  return (
    <PreviewRecipeWrapper>
      <div className="">
        <Alert>
          <span className="recipe-name">{recipeName}</span>
        </Alert>
      </div>
      <div className="header-content-wrapper">
        <Badge bg="success" className="heading-badge">
          <span className="heading-text">Ingredients</span>
        </Badge>
        <ul className="recipe-content">
          {ingredients.map((ingredient: string) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="header-content-wrapper">
        <Badge bg="success" className="heading-badge">
          <span className="heading-text">Steps</span>
        </Badge>
        <ol className="recipe-content">
          {steps.map((step: string) => (
            <li>{step}</li>
          ))}
        </ol>
      </div>
    </PreviewRecipeWrapper>
  );
};

export default PreviewRecipe;
