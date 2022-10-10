import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import InlineRecipeCard from "./InlineRecipeCard";
import { selectedRecipe } from "../MealPlanner.mockdata";

export default {
  title: "MealPlanner/InlineRecipeCard",
  component: InlineRecipeCard,
} as ComponentMeta<typeof InlineRecipeCard>;

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
