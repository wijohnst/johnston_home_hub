import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import DayOfWeekButtonBar from "../features/mealPlanner/DayOfWeekButtonBar";

export default {
  title: "MealPlanner/DayOfWeekButtonBar",
  component: DayOfWeekButtonBar,
} as ComponentMeta<typeof DayOfWeekButtonBar>;

const Template: ComponentStory<typeof DayOfWeekButtonBar> = (args) => (
  <DayOfWeekButtonBar {...args} />
);

export const StartSunday = Template.bind({});
StartSunday.args = {
  listGroupContent: [
    { text: "Sun.", value: 0 },
    { text: "Mon.", value: 1 },
    { text: "Tue.", value: 2 },
    { text: "Wed.", value: 3 },
    { text: "Thur.", value: 4 },
    { text: "Fri.", value: 5 },
    { text: "Sat.", value: 6 },
  ],
  handleSelection: (value) => console.log(String(value)),
};

export const StartMonday = Template.bind({});
StartMonday.args = {
  ...StartSunday.args,
  listGroupContent: [
    { text: "Mon.", value: 1 },
    { text: "Tue.", value: 2 },
    { text: "Wed.", value: 3 },
    { text: "Thur.", value: 4 },
    { text: "Fri.", value: 5 },
    { text: "Sat.", value: 6 },
    { text: "Sun.", value: 0 },
  ],
};
