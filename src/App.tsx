import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import PetFeeder from "./features/petFeeder/PetFeeder";

import "./App.css";

type Props = {};

const App = (props: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PetFeeder />
    </QueryClientProvider>
  );
};

export default App;
