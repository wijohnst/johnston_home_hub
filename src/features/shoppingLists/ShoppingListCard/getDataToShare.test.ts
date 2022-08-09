import {
  Aisle,
  GroceryItem,
  ShoppingListCategoriesEnum,
  Store,
} from "../shoppingListsApi";
import { getTextFromItems } from "./getDataToShare";

describe("getTextFromItems unit tests", () => {
  const aisles: Aisle[] = [
    {
      _id: "aisle-001",
      aisle: "Dairy",
    },
    {
      _id: "aisle-002",
      aisle: "Produce",
    },
  ];

  const stores: Store[] = [
    {
      _id: "store-001",
      name: "Giant Eagle",
      category: ShoppingListCategoriesEnum.GROCERY,
    },
    {
      _id: "store-002",
      name: "Kroger",
      category: ShoppingListCategoriesEnum.GROCERY,
    },
  ];
  it.skip("Should return the correct item text", () => {
    const items: GroceryItem[] = [
      {
        _id: "groceryItem-001",
        name: "Milk",
        aisle: aisles[0],
        category: ShoppingListCategoriesEnum.GROCERY,
        store: stores[0],
        quantity: "1 ea.",
      },
      {
        _id: "groceryItem-002",
        name: "Carrots",
        aisle: aisles[1],
        category: ShoppingListCategoriesEnum.GROCERY,
        store: stores[1],
        quantity: "1 lbs.",
      },
    ];

    expect(getTextFromItems(items, ShoppingListCategoriesEnum.GROCERY)).toEqual(
      `- ITEM: Milk, AISLE: Dairy, QUANTITY: 1 ea. \n- ITEM: Carrots, AISLE: Produce, QUANTITY: 1 lbs. `
    );
  });
});
