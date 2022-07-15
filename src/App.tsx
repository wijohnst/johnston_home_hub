import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PetFeeder from "./features/petFeeder/PetFeeder";
import ChoreTracker from "./features/choreTracker/ChoreTracker";

import "./App.css";

import { WidgetWrapper } from "./App.style";

type Props = {};

const App = (props: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Row>
          <Col md="auto">
            <WidgetWrapper>
              <ChoreTracker />
            </WidgetWrapper>
          </Col>
          <Col>
            <WidgetWrapper>
              <PetFeeder />
            </WidgetWrapper>
          </Col>
        </Row>
      </Container>
    </QueryClientProvider>
  );
};

export default App;
