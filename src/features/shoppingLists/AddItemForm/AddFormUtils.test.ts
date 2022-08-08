import {
  Aisle,
  GroceryItem,
  ShoppingListCategoriesEnum,
  Store,
} from "../shoppingListsApi";
import { getEntryValueById, getStoreDataFromForm } from "./AddItemForm.utils";

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

describe("getStoreDataFromForm unit tests", () => {
  it("Should return the correct store", () => {
    const stores: Store<string>[] = [
      {
        _id: "store-001",
        name: "Store 1",
        category: ShoppingListCategoriesEnum.GROCERY,
      },
      {
        _id: "store-002",
        name: "Store 2",
        category: ShoppingListCategoriesEnum.GROCERY,
      },
    ];

    const itemToEdit: GroceryItem = {
      _id: "item-001",
      name: "Item 1",
      store: stores[0],
      aisle: {
        _id: "aisle-001",
        aisle: "Produce",
      },
      category: ShoppingListCategoriesEnum.GROCERY,
      quantity: "1 ea.",
    };

    expect(
      getStoreDataFromForm(false, stores, itemToEdit, "store-002")
    ).toEqual(stores[1]);

    expect(getStoreDataFromForm(true, stores, itemToEdit, "Publix")).toEqual({
      _id: undefined,
      name: "Publix",
      category: ShoppingListCategoriesEnum.GROCERY,
    });
  });
});
