import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AisleHeading } from "./AisleHeading";

export default {
  title: "Shopping List/Shopping Mode/Aisle Heading",
  component: AisleHeading,
} as ComponentMeta<typeof AisleHeading>;

const Template: ComponentStory<typeof AisleHeading> = (args) => (
  <AisleHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  aisleName: "Aisle Name",
};

export const Closed = Template.bind({});
Closed.args = {
  ...Default.args,
  isOpen: false,
};

export const Open = Template.bind({});
Open.args = {
  ...Default.args,
  isOpen: true,
};
