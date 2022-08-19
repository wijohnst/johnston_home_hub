import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useQueryClient } from "react-query";

import Badge from "react-bootstrap/Badge";
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
        <Col>
          <h2>
            <Badge
              bg="primary"
              onClick={() => setShouldShowNewRecipeModal(true)}
            >
              Add
            </Badge>
          </h2>
        </Col>
        <Col>
          <h2>
            <Badge
              bg="primary"
              onClick={() => setShouldShowRecipesCollectionModal(true)}
            >
              All Recipes
            </Badge>
          </h2>
        </Col>
        <NewRecipeModal
          isShown={shouldShowNewRecipeModal}
          handleHide={() => handleCloseNewRecipeModal()}
        />
      </Row>
    </Container>
  );
};

export default Recipes;
