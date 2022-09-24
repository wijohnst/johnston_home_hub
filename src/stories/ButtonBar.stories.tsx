import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ButtonBar from "../components/SharedComponents/ButtonBar";

export default {
  title: "Shared Components/ButtonBar",
  component: ButtonBar,
} as ComponentMeta<typeof ButtonBar>;

const Template: ComponentStory<typeof ButtonBar> = (args) => (
  <ButtonBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  listGroupContent: [
    { text: "List Group 1", value: 1 },
    { text: "List Group 2", value: 2 },
  ],
  handleSelection: (value) => console.log(value),
};

export const Weekdays = Template.bind({});
Weekdays.args = {
  ...Default.args,
  listGroupContent: [
    { text: "Sun.", value: 0 },
    { text: "Mon.", value: 1 },
    { text: "Tue.", value: 2 },
    { text: "Wed.", value: 3 },
    { text: "Thur.", value: 4 },
    { text: "Fri.", value: 5 },
    { text: "Sat.", value: 6 },
  ],
};
