import {
  Aisle,
  GroceryItem,
  ShoppingListCategoriesEnum,
  Store,
} from "../shoppingListsApi";
import { getEntryValueById } from "./AddItemForm.utils";

describe("getItemValueById unit tests", () => {
  it("Should return the correct entry value", () => {
    const items: GroceryItem[] = [
      {
        _id: "groceryItem-1",
        name: "Apples",
        category: ShoppingListCategoriesEnum.GROCERY,
        aisle: {
          _id: "aisle-2",
          aisle: "Produce",
        },
        store: {
          _id: "store-1",
          name: "Giant Eagle",
          category: ShoppingListCategoriesEnum.GROCERY,
        },
        quantity: "1 ea.",
      },
      {
        _id: "groceryItem-2",
        name: "Milk",
        category: ShoppingListCategoriesEnum.GROCERY,
        aisle: {
          _id: "aisle-1",
          aisle: "Dairy",
        },
        store: {
          _id: "store-1",
          name: "Giant Eagle",
          category: ShoppingListCategoriesEnum.GROCERY,
        },
        quantity: "1 ea.",
      },
    ];

    expect(getEntryValueById<Store>(items, "store", "groceryItem-1")).toEqual(
      items[0].store
    );
    expect(getEntryValueById<Aisle>(items, "aisle", "groceryItem-2")).toEqual(
      items[1].aisle
    );
  });

  it("Should return the correct store object", () => {
    const stores: Store[] = [
      {
        _id: "store-1",
        name: "Giant Eagle",
        category: ShoppingListCategoriesEnum.GROCERY,
      },
      {
        _id: "store-2",
        name: "Krgoer",
        category: ShoppingListCategoriesEnum.GROCERY,
      },
    ];

    expect(getEntryValueById(stores, "name", "store-1")).toEqual("Giant Eagle");
  });
});
