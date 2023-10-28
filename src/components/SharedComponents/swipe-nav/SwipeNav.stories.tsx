import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SwipeNav } from "./SwipeNav";

export default {
  title: "Shared Components/SwipeNav",
  component: SwipeNav,
} as ComponentMeta<typeof SwipeNav>;

const Template: ComponentStory<typeof SwipeNav> = (args) => (
  <SwipeNav {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const FirstIsActive = Template.bind({});
FirstIsActive.args = {
  swipeIndicators: [true, false, false],
};

export const LastIsActive = Template.bind({});
LastIsActive.args = {
  swipeIndicators: [false, false, true],
};
