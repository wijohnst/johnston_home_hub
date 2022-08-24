import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useQueryClient } from "react-query";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import NewRecipeModal from "./NewRecipeModal/NewRecipeModal";

const Recipes = () => {
  const QueryClient = useQueryClient();
  const [shouldShowNewRecipeModal, setShouldShowNewRecipeModal] =
    React.useState(true);
  const [
    shouldShowRecipesCollectionModal,
    setShouldShowRecipesCollectionModal,
  ] = React.useState(false);

  const handleCloseNewRecipeModal = () => {
    QueryClient.invalidateQueries("generateRecipe");
    setShouldShowNewRecipeModal(false);
  };

  return (
    <Container fluid>
      <Row>
        <h1>Recipes</h1>
      </Row>
      <Row>
        <div className="d-grid gap-2">
          <Button onClick={() => setShouldShowNewRecipeModal(true)} size="lg">
            Add Recipe
          </Button>
          <Button
            onClick={() => setShouldShowRecipesCollectionModal(true)}
            size="lg"
          >
            View Recipes
          </Button>
        </div>
        <NewRecipeModal
          isShown={shouldShowNewRecipeModal}
          handleHide={() => handleCloseNewRecipeModal()}
        />
      </Row>
    </Container>
  );
};

export default Recipes;
