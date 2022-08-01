import axios from "axios";
import { DefaultResponse } from "../../SharedTypes";

export enum ShoppingListCategoriesEnum {
  GROCERY = "Grocery",
  HARDWARE = "Hardware",
  ONLINE = "Online",
}

export interface Store {
  _id: string;
  name: string;
  category: ShoppingListCategoriesEnum;
}

export interface Aisle {
  _id: string;
  aisle: string;
}
export interface Item {
  _id: string;
  name: string;
  store: Store;
  quantity: string;
  category: string | undefined;
}

export interface GroceryItem extends Item {
  aisle: Aisle;
  category: "Grocery";
  store: Store;
}

export interface OnlineItem extends Item {
  url: string;
  category: "Online";
  store: Store;
}

export interface ShoppingList {
  _id: string;
  category: ShoppingListCategoriesEnum;
  items: Item[] | GroceryItem[] | OnlineItem[];
}

interface FetchShoppingListsResponse extends DefaultResponse {
  shoppingLists: ShoppingList[];
}

export const fetchShoppingLists = async (): Promise<ShoppingList[] | void> => {
  try {
    const {
      data: { shoppingLists },
    } = await axios.get<FetchShoppingListsResponse>(
      "http://localhost:3001/shoppingList/",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return shoppingLists;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Adds an Item to a given ShoppingList
 *
 * @param {string} _shoppingListId - shoppingListId
 * @param { Item | GroceryItem | OnlineItem }itemData
 * @returns Promise<DefaultResponse>
 */
export const addItemToShoppingList = async (
  _shoppingListId: string,
  itemData: Item | GroceryItem | OnlineItem
): Promise<DefaultResponse> => {
  try {
    console.log(itemData);
    const { data } = await axios.patch<DefaultResponse>(
      "http://localhost:3001/shoppingList",
      {
        _shoppingListId: _shoppingListId,
        item: itemData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "Adding shopping list item failed.",
    };
  } finally {
    console.log("PATCH: /shoppingList/ completed...");
  }
};