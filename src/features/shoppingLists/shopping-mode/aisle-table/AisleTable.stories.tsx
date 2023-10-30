import * as React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AisleTable } from "./AisleTable";

export default {
  title: "Shopping List/Shopping Mode/AisleTable",
  component: AisleTable,
} as ComponentMeta<typeof AisleTable>;

const Template: ComponentStory<typeof AisleTable> = (args) => (
  <div style={{ width: "400px" }}>
    <AisleTable {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
