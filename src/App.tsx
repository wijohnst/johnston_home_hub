import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PetFeeder from "./features/petFeeder/PetFeeder";
import ChoreTracker from "./features/choreTracker/ChoreTracker";

import "./App.css";

import {
  AppWrapper,
  WidgetWrapper,
  RevealableWidgetWrapper,
} from "./App.style";
import ShoppingLists from "./features/shoppingLists/ShoppingLists";
import RevealButton from "./components/RevealButton/RevealButton";

type Props = {};

const App = (props: Props) => {
  const queryClient = new QueryClient();

  const [areAllShoppingListsShown, setAreAllShopingListsShown] =
    React.useState(false);

  const handleRevealShoppingListClick = (): void => {
    setAreAllShopingListsShown(!areAllShoppingListsShown);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <Container>
          <Row>
            <Col md={3}>
              <WidgetWrapper>
                <ChoreTracker />
              </WidgetWrapper>
            </Col>
            <Col>
              <WidgetWrapper>
                <PetFeeder />
              </WidgetWrapper>
              <RevealableWidgetWrapper isRevealed={areAllShoppingListsShown}>
                <ShoppingLists />
              </RevealableWidgetWrapper>
              <RevealButton
                ctaText={{
                  isRevealedText: "Hide lists",
                  isNotRevealedText: "Show all lists",
                }}
                isRevealed={areAllShoppingListsShown}
                handleClick={handleRevealShoppingListClick}
              />
            </Col>
          </Row>
        </Container>
      </AppWrapper>
    </QueryClientProvider>
  );
};

export default App;
