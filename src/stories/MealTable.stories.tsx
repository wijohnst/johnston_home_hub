import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MealTable from "../features/mealPlanner/MealTable";
import { selectedRecipe } from "../features/mealPlanner/MealPlanner.mockdata";

import { mockMealPlans } from "../features/mealPlanner/MealPlanner.mockdata";

export default {
  title: "MealPlanner/MealTable",
  component: MealTable,
} as ComponentMeta<typeof MealTable>;

const Template: ComponentStory<typeof MealTable> = (args) => (
  <MealTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  targetMealPlan: Object.entries(mockMealPlans)[0],
  handleAddClick: () => console.log("Plus Icon clicked..."),
  handleRecipeSelect: (recipeId: string) => console.log(recipeId),
};

export const RecipeSelected = Template.bind({});
RecipeSelected.args = {
  ...Default.args,
  selectedRecipe: selectedRecipe,
};
