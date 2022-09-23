import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Link from "../components/SharedComponents/Link";
import { LinkTypes } from "../constants";

export default {
  title: "Shared Components/Link",
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  linkType: LinkTypes.PRIMARY,
  handleClick: () => console.log("Click..."),
};

export const Danger = Template.bind({});
Danger.args = {
  ...Primary.args,
  linkType: LinkTypes.DANGER,
};

export const Success = Template.bind({});
Success.args = {
  ...Primary.args,
  linkType: LinkTypes.SUCCESS,
};
