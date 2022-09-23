import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { QueryClientProvider, QueryClient } from "react-query";

import RecipesCollectionModal from "../features/recipes/RecipesCollectionModal/RecipesCollectionModal";

const queryClient = new QueryClient();

export default {
  title: "Modals/RecipesCollectionModal",
  component: RecipesCollectionModal,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof RecipesCollectionModal>;

const Template: ComponentStory<typeof RecipesCollectionModal> = (args) => (
  <RecipesCollectionModal {...args} />
);

export const Default = Template.bind({});

Default.args = {
  isShown: true,
  handleHide: () => {},
};
