import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ScheduleRepeatRecipeModal from "../features/mealPlanner/ScheduleRepeatRecipeModal/ScheduleRepeatRecipeModal";

export default {
  title: "Modals/ScheduleRepeatRecipeModal",
  component: ScheduleRepeatRecipeModal,
} as ComponentMeta<typeof ScheduleRepeatRecipeModal>;

const Template: ComponentStory<typeof ScheduleRepeatRecipeModal> = (args) => (
  <ScheduleRepeatRecipeModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isShown: true,
  targetRecipe: {
    _id: "001-a",
    name: "Sample Recipe",
    ingredients: [
      {
        name: "Ingredient 1",
        quantity: 1,
        unit: "ea.",
        linkedItem: null,
      },
    ],
    steps: [""],
    url: "",
  },
  handleSaveClick: () => {},
  handleCancelClick: () => {},
};
