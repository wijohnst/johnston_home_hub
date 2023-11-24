import { GroceryItem, ShoppingListCategoriesEnum } from "../shoppingListsApi";

export namespace ShoppingMode {
  export type AisleItem = GroceryItem & {
    isVisible: boolean;
  };

  export type ItemsByAisleMap = Record<string, GroceryItem[]>;

  export namespace MOCK_SHOPPING_MODE_DATA {
    export const MOCK_GROCERY_ITEM: GroceryItem = {
      _id: "MOCK_ITEM_ID",
      name: "Mock Item Name",
      quantity: "1 EA.",
      store: {
        _id: "MOCK_STORE_ID",
        name: "MOCK_STORE_NAME",
        category: "MOCK_STORE_CATEGORY",
      },
      aisle: {
        _id: "MOCK_AISLE_ID",
        aisle: "MOCK_AISLE_NAME",
      },
      category: ShoppingListCategoriesEnum.GROCERY,
    };
  }
}
