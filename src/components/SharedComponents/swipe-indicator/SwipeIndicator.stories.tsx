import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SwipeIndicator } from "./SwipeIndicator";

export default {
  title: "Shared Components/SwipeNav/SwipeIndicator",
  component: SwipeIndicator,
} as ComponentMeta<typeof SwipeIndicator>;

const Template: ComponentStory<typeof SwipeIndicator> = (args) => (
  <SwipeIndicator {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
};
