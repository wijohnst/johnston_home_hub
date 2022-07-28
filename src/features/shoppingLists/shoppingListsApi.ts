import axios from "axios";
import { DefaultResponse } from "../../SharedTypes";

export interface Item {
  _id: string;
  name: string;
  store: string;
  quantity: string;
}

export interface GroceryItem extends Item {
  aisle: string;
}

export interface OnlineItem extends Item {
  url: string;
}

export enum ShoppingListCategoriesEnum {
  GROCERY = "Grocery",
  HARDWARE = "Hardware",
  ONLINE = "Online",
}
export interface ShoppingList {
  _id: string;
  category: ShoppingListCategoriesEnum;
  items: Item[] | GroceryItem[] | OnlineItem[];
}

interface FetchShoppingListsResponse extends DefaultResponse {
  data: ShoppingList[];
}

export const fetchShoppingLists = async (): Promise<ShoppingList[] | void> => {
  try {
    const {
      data: { data },
    } = await axios.get<FetchShoppingListsResponse>(
      "http://localhost:3001/shoppingList/",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addItemToShoppingList = async (
  _id: string,
  itemData: Item | GroceryItem | OnlineItem
): Promise<DefaultResponse> => {
  try {
    const { data } = await axios.patch<DefaultResponse>(
      "http://localhost:3001/shoppingList",
      {
        _id: _id,
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
