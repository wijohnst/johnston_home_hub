import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InlineRecipeCard from "./InlineRecipeCard";
import { Recipe } from "../../recipes/recipesApi";

export default {
  title: "MealPlanner/InlineRecipeCard",
  component: InlineRecipeCard,
} as ComponentMeta<typeof InlineRecipeCard>;

const selectedRecipe: Recipe = {
  _id: "001",
  name: "Sample Recipe",
  ingredients: [
    {
      name: "Ingredient 1",
      quantity: 1,
      unit: "ea.",
      linkedItem: null,
    },
  ],
  steps: ["Do something"],
  url: null,
};

const Template: ComponentStory<typeof InlineRecipeCard> = (args) => (
  <InlineRecipeCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  selectedRecipe: selectedRecipe,
  handleLockedRecipeClick: () => console.log("Locked Recipe clicked..."),
  handleRecipeClick: () => console.log("Recipe clicked..."),
};

export const LockedRecipe = Template.bind({});
LockedRecipe.args = {
  ...Default.args,
  isRecipeLocked: true,
};
