import * as React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreTable } from "./StoreTable";

export default {
  title: "Shopping List/Shopping Mode/StoreTable",
  component: StoreTable,
} as ComponentMeta<typeof StoreTable>;

const Template: ComponentStory<typeof StoreTable> = (args) => (
  <div style={{ width: "600px" }}>
    <StoreTable {...args} />
  </div>
);

export const Default = Template.bind({});
