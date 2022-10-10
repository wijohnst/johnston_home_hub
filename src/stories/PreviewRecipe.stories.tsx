import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import PreviewRecipe from "../features/recipes/EditGeneratedRecipe/PreviewRecipe";

import { selectedRecipe } from "../features/mealPlanner/MealPlanner.mockdata";

export default {
  title: "Recipes/PreviewRecipe",
  component: PreviewRecipe,
} as ComponentMeta<typeof PreviewRecipe>;

const Template: ComponentStory<typeof PreviewRecipe> = (args) => (
  <PreviewRecipe {...args} />
);

export const Default = Template.bind({});
Default.args = {
  recipeName: selectedRecipe.name,
  ingredients: selectedRecipe.ingredients.map((ingredient) => ingredient.name),
  steps: selectedRecipe.steps,
};
