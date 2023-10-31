import * as React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AisleTable } from "./AisleTable";
import { ShoppingMode } from "../shoppingMode";

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
Default.args = {
  aisleName: "Aisle Name",
  initialOpenState: false,
  storeItemData: [
    ShoppingMode.MOCK_SHOPPING_MODE_DATA.MOCK_GROCERY_ITEM,
    ShoppingMode.MOCK_SHOPPING_MODE_DATA.MOCK_GROCERY_ITEM,
  ],
};

export const Open = Template.bind({});
Open.args = {
  ...Default.args,
  initialOpenState: true,
};
