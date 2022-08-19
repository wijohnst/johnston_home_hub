import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

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
import useMediaQuery from "./hooks/useMediaQuery";
import { Breakpoints } from "./constants";
import Recipes from "./features/recipes/Recipes";

type Props = {};

const queryClient = new QueryClient();

const App = (props: Props) => {
  const [areAllShoppingListsShown, setAreAllShopingListsShown] =
    React.useState(false);

  const handleRevealShoppingListClick = (): void => {
    setAreAllShopingListsShown(!areAllShoppingListsShown);
  };

  const isMobile = useMediaQuery(Breakpoints.mobile);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppWrapper>
        <Container>
          <Row>
            <Col md={3}>
              <WidgetWrapper>
                <ChoreTracker />
              </WidgetWrapper>
              <WidgetWrapper>
                <Recipes />
              </WidgetWrapper>
            </Col>
            <Col>
              <WidgetWrapper>
                <PetFeeder />
              </WidgetWrapper>
              <RevealableWidgetWrapper
                isRevealed={isMobile ? true : areAllShoppingListsShown}
              >
                <ShoppingLists />
              </RevealableWidgetWrapper>
              {!isMobile && (
                <RevealButton
                  ctaText={{
                    isRevealedText: "Hide lists",
                    isNotRevealedText: "Show all lists",
                  }}
                  isRevealed={areAllShoppingListsShown}
                  handleClick={handleRevealShoppingListClick}
                />
              )}
            </Col>
          </Row>
        </Container>
      </AppWrapper>
    </QueryClientProvider>
  );
};

export default App;
