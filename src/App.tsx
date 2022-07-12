import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import Container from "react-bootstrap/Container";

import PetFeeder from "./features/petFeeder/PetFeeder";

import "./App.css";

import { WidgetWrapper } from "./App.style";

type Props = {};

const App = (props: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <WidgetWrapper>
          <PetFeeder />
        </WidgetWrapper>
      </Container>
    </QueryClientProvider>
  );
};

export default App;
