import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import ChildTooltip from "../components/SharedComponents/ChildTooltip";

import { ReactComponent as PlusIcon } from "../assets/images/plus_icon.svg";
import { LinkTypes } from "../constants";
import Link from "../components/SharedComponents/Link";

export default {
  title: "Shared Components/ChildTooltip",
  component: ChildTooltip,
} as ComponentMeta<typeof ChildTooltip>;

const Template: ComponentStory<typeof ChildTooltip> = (args) => (
  <ChildTooltip {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const CustomText = Template.bind({});
CustomText.args = {
  ...Default.args,
  tooltipText: "I'm a custom tooltip.",
};

export const Danger = Template.bind({});
Danger.args = {
  ...Default.args,
  variant: "danger",
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  variant: "success",
};

export const Icon = Template.bind({});
Icon.args = {
  ...Default.args,
  children: <PlusIcon />,
};

export const _Link = Template.bind({});
_Link.args = {
  ...Default.args,
  children: (
    <Link linkType={LinkTypes.PRIMARY} linkText="Link" handleClick={() => {}} />
  ),
};
