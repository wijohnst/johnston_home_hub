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
const MOCK_ITEM_DATA_ENTRY =
  ShoppingMode.MOCK_SHOPPING_MODE_DATA.MOCK_ITEM_DATA_ENTRY;

export const Default = Template.bind({});
Default.args = {
  isShown: true,
  storeName: "Store Name",
  storeItemData: [
    getMockValueWithUpdatedFields(MOCK_ITEM_DATA_ENTRY, {
      aisle: { _id: "1", aisle: "Aisle 1" },
    }),
    getMockValueWithUpdatedFields(MOCK_ITEM_DATA_ENTRY, {
      aisle: { _id: "2", aisle: "Aisle 2" },
    }),
  ],
};
