import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreTable } from "./StoreTable";
import { ShoppingMode } from "../shoppingMode";

export default {
  title: "Shopping List/ Shopping Mode/StoreTable",
  component: StoreTable,
} as ComponentMeta<typeof StoreTable>;

const Template: ComponentStory<typeof StoreTable> = (args) => (
  <StoreTable {...args} />
);

const MOCK_ITEM_DATA_ENTRY =
  ShoppingMode.MOCK_SHOPPING_MODE_DATA.MOCK_ITEM_DATA_ENTRY;
export const Default = Template.bind({});
Default.args = {
  itemData: [
    {
      ...MOCK_ITEM_DATA_ENTRY,
      name: "Bananas",
      aisle: { _id: "1", aisle: "Produce" },
    },
    {
      ...MOCK_ITEM_DATA_ENTRY,
      name: "Bread",
      aisle: { _id: "2", aisle: "Bakery" },
    },
    {
      ...MOCK_ITEM_DATA_ENTRY,
      name: "Apples",
      aisle: { _id: "1", aisle: "Produce" },
    },
  ],
  storeName: "Store Name",
};
