import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShoppingModeModal } from "./ShoppingModeModal";
import { ShoppingMode } from "../shoppingMode";

import { getMockValueWithUpdatedFields } from "../../../../mocks/mock-utils";

export default {
  title: "Shopping List/Shopping Mode/ShoppingModeModal",
  component: ShoppingModeModal,
} as ComponentMeta<typeof ShoppingModeModal>;

const Template: ComponentStory<typeof ShoppingModeModal> = (args) => (
  <ShoppingModeModal {...args} />
);
const MOCK_GROCERY_ITEM =
  ShoppingMode.MOCK_SHOPPING_MODE_DATA.MOCK_GROCERY_ITEM;

export const Default = Template.bind({});
Default.args = {
  isShown: true,
  storeName: "Store Name",
  groceryList: [
    getMockValueWithUpdatedFields(MOCK_GROCERY_ITEM, {
      aisle: { _id: "1", aisle: "Aisle 1" },
    }),
    getMockValueWithUpdatedFields(MOCK_GROCERY_ITEM, {
      aisle: { _id: "2", aisle: "Aisle 2" },
    }),
  ],
};
