import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import MealPlanner from "../features/mealPlanner/MealPlanner";
import { WidgetWrapper } from "../App.style";

export default {
  title: "MealPlanner/MealPlanner",
  component: MealPlanner,
  decorators: [
    (Story) => (
      <WidgetWrapper>
        <Story />
      </WidgetWrapper>
    ),
  ],
} as ComponentMeta<typeof MealPlanner>;

const Template: ComponentStory<typeof MealPlanner> = (args) => <MealPlanner />;

export const Default = Template.bind({});
Default.args = {};
