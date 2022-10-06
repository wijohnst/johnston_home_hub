import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useQueryClient } from "react-query";

import Button from "react-bootstrap/Button";
import NewRecipeModal from "./NewRecipeModal/NewRecipeModal";
import RecipesCollectionModal from "./RecipesCollectionModal/RecipesCollectionModal";

const Recipes = () => {
  const QueryClient = useQueryClient();
  const [shouldShowNewRecipeModal, setShouldShowNewRecipeModal] =
    React.useState(false);
  const [
    shouldShowRecipesCollectionModal,
    setShouldShowRecipesCollectionModal,
  ] = React.useState(false);

  const handleCloseNewRecipeModal = () => {
    QueryClient.invalidateQueries("generateRecipe");
    setShouldShowNewRecipeModal(false);
  };

  const handleCloseRecipesCollectionModal = () => {
    setShouldShowRecipesCollectionModal(false);
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
        <RecipesCollectionModal
          isShown={shouldShowRecipesCollectionModal}
          handleHide={handleCloseRecipesCollectionModal}
        />
      </Row>
    </Container>
  );
};

export default Recipes;
