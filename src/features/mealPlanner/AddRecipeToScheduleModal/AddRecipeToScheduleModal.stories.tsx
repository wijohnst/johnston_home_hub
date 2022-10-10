import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { QueryClientProvider, QueryClient } from "react-query";

import { AddRecipeToScheduleModal } from "./AddRecipeToScheduleModal";
import { MealPlanMeals } from "../mealPlannerApi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default {
  title: "MealPlanner/AddRecipeToScheduleModal",
  component: AddRecipeToScheduleModal,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof AddRecipeToScheduleModal>;

const Template: ComponentStory<typeof AddRecipeToScheduleModal> = (args) => (
  <AddRecipeToScheduleModal {...args} />
);

let isModalShown = true;

export const Default = Template.bind({});
Default.args = {
  isShown: isModalShown,
  handleHide: () => {
    isModalShown = false;
  },
  mealType: MealPlanMeals.BREAKFAST,
  handleRecipeClick: (recipeId: string) => console.log(recipeId),
};
