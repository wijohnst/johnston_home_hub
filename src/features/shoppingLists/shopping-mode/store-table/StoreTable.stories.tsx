import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreTable } from "./StoreTable";
import { ShoppingMode } from "../shoppingMode";
import { getMockValueWithUpdatedFields } from "../../../../mocks/mock-utils";

export default {
  title: "Shopping List/ Shopping Mode/StoreTable",
  component: StoreTable,
} as ComponentMeta<typeof StoreTable>;

const Template: ComponentStory<typeof StoreTable> = (args) => (
  <StoreTable {...args} />
);

const MOCK_GROCERY_ITEM =
  ShoppingMode.MOCK_SHOPPING_MODE_DATA.MOCK_GROCERY_ITEM;

export const Default = Template.bind({});
Default.args = {
  groceryList: [
    getMockValueWithUpdatedFields(MOCK_GROCERY_ITEM, {
      aisle: { _id: "1", aisle: "Aisle 1" },
    }),
    getMockValueWithUpdatedFields(MOCK_GROCERY_ITEM, {
      name: "Some Other Mock Item",
      aisle: { _id: "2", aisle: "Aisle 2" },
    }),
  ],
  storeName: "Store Name",
};
