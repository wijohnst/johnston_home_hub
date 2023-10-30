import { ItemData } from "../shoppingListsApi";

export namespace ShoppingMode {
  export type AisleItem = ItemData & {
    isVisible: boolean;
  };

  export type ItemsByAisleMap = Record<string, ItemData[]>;

  export namespace MOCK_SHOPPING_MODE_DATA {
    export const MOCK_ITEM_DATA_ENTRY: ItemData = {
      _id: "MOCK_ITEM_ID",
      name: "Mock Item Name",
      quantity: "1 EA.",
      store: {
        _id: "MOCK_STORE_ID",
        name: "MOCK_STORE_NAME",
        category: "MOCK_STORE_CATEGORY",
      },
      url: undefined,
      aisle: {
        _id: "MOCK_AISLE_ID",
        aisle: "MOCK_AISLE_NAME",
      },
      category: "MOCK_ITEM_CATEGORY",
    };
  }
}
