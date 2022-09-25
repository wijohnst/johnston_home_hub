import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Stack from "react-bootstrap/Stack";

import AlertTableRow from "../components/AlertTable/AlertTableRow";

import { getSecondaryColorByVariant } from "../components/SharedComponents/SharedComponents.utils";
import { BootstrapVariantsEnum } from "../constants";
import Link from "../components/SharedComponents/Link";
import ChildTooltip from "../components/SharedComponents/ChildTooltip";

import { ReactComponent as PlusIcon } from "../assets/images/plus_icon.svg";
import { ReactComponent as LockIcon } from "../assets/images/lock_icon.svg";

export default {
  title: "Shared Components/AlertTableRow",
  component: AlertTableRow,
} as ComponentMeta<typeof AlertTableRow>;

const Template: ComponentStory<typeof AlertTableRow> = (args) => (
  <AlertTableRow {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: (
    <PlusIcon
      fill={getSecondaryColorByVariant(BootstrapVariantsEnum.PRIMARY)}
    />
  ),
  headingText: "Heading Text",
  children: ["Entry 1", "Entry 2"].map((text: string) => (
    <span onClick={() => console.log("Entry clicked...")}>{text}</span>
  )),
};

export const Danger = Template.bind({});
Danger.args = {
  ...Default.args,
  icon: (
    <PlusIcon fill={getSecondaryColorByVariant(BootstrapVariantsEnum.DANGER)} />
  ),
  variant: "danger",
};

export const ChildIconEntry = Template.bind({});
ChildIconEntry.args = {
  ...Default.args,
  children: (
    <Stack direction="horizontal" className="justify-content-center" gap={2}>
      <ChildTooltip placement="left" tooltipText="Lock entry">
        <LockIcon
          fill={getSecondaryColorByVariant(BootstrapVariantsEnum.PRIMARY)}
          onClick={() => console.log("Icon clicked...")}
        />
      </ChildTooltip>
      <Link
        linkText="Link"
        handleClick={() => console.log("Link clicked...")}
      />
    </Stack>
  ),
};
