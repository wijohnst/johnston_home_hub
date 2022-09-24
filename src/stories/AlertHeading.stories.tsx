import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import AlertHeading from "../components/SharedComponents/AlertHeading";
import { ReactComponent as PlusIcon } from "../assets/images/plus_icon.svg";
import { getSecondaryColorByVariant } from "../components/SharedComponents/SharedComponents.utils";
export default {
  title: "Shared Components/AlertHeading",
  component: AlertHeading,
} as ComponentMeta<typeof AlertHeading>;

const Template: ComponentStory<typeof AlertHeading> = (args) => (
  <AlertHeading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  headingText: "Heading Text",
  icon: <PlusIcon fill={getSecondaryColorByVariant()} />,
  handleIconClick: () => console.log("Click..."),
};

export const Danger = Template.bind({});
Danger.args = {
  ...Default.args,
  variant: "danger",
  icon: <PlusIcon fill={getSecondaryColorByVariant("danger")} />,
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  variant: "success",
  icon: <PlusIcon fill={getSecondaryColorByVariant("success")} />,
};
