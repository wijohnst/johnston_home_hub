import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MealTable from "../features/mealPlanner/MealTable";

export default {
  title: "MealPlanner/MealTable",
  component: MealTable,
} as ComponentMeta<typeof MealTable>;

const Template: ComponentStory<typeof MealTable> = (args) => (
  <MealTable {...args} />
);

export const Default = Template.bind({});
Default.args = {};
