import axios from "axios";

import { DefaultResponse } from "../../SharedTypes";
import { DefaultURL } from "../../constants";

export enum ShoppingListCategoriesEnum {
  GROCERY = "Grocery",
  HARDWARE = "Hardware",
  ONLINE = "Online",
}

export interface Store<IdType = string> {
  _id: IdType;
  name: string;
  category: string | undefined;
}

export interface Aisle<IdType = string> {
  _id: IdType;
  aisle: string;
}
export interface Item {
  _id: string;
  name: string;
  store: Store;
  quantity: string;
  category: string | undefined;
}

/**
 * This type is what is sent from FE to BE when creating / updating an Item in a ShoppingList
 */
export interface ItemData {
  _id: string;
  name: string;
  quantity: string;
  store: Store<undefined> | Store<string>;
  url: string | undefined;
  aisle: Aisle<undefined> | Aisle<string>;
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

export type AllItemsUnion = Item | GroceryItem | OnlineItem;

export interface AllItems {
  hardware: Item[];
  grocery: GroceryItem[];
  online: OnlineItem[];
  uncategorized: Item[];
  [key: string]: AllItemsUnion[];
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
      `${DefaultURL}/shoppingList/`,
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

interface FetchStoresResponse extends DefaultResponse {
  stores: Store[];
}
export const fetchStores = async (): Promise<Store[] | void> => {
  try {
    const {
      data: { stores },
    } = await axios.get<FetchStoresResponse>(
      `${DefaultURL}/shoppingList/stores`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return stores;
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
    const { data } = await axios.patch<DefaultResponse>(
      `${DefaultURL}/shoppingList`,
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

interface GetAislesResponse extends DefaultResponse {
  aisles: Aisle[];
}

/**
 * HTTP request that returns an array of `Aisles`
 *
 * @returns {Promise<Aisle[] | void>}
 */
export const getAllAisles = async (): Promise<Aisle[]> => {
  try {
    const {
      data: { aisles },
    } = await axios.get<GetAislesResponse>(
      `${DefaultURL}/shoppingList/aisles`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return aisles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface GetAllItemsResponse extends DefaultResponse {
  allItems: AllItems;
}

export const getAllItems = async (): Promise<AllItems | void> => {
  try {
    const {
      data: { allItems },
    } = await axios.get<GetAllItemsResponse>(
      `${DefaultURL}/shoppingList/items`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return allItems;
  } catch (error) {
    console.error(error);
  }
};

/**
 * HTTP request that removes the idsToDelete from the targetList.items array
 *
 * @param {string} targetListId
 * @param {string[]} idsToDelete
 * @returns
 */
export const removeItemFromShoppingList = async (
  targetListId: string,
  idsToDelete: string[]
): Promise<DefaultResponse> => {
  try {
    const { data } = await axios.delete<DefaultResponse>(
      `${DefaultURL}/shoppingList/`,
      {
        data: {
          targetListId: targetListId,
          idsToDelete: idsToDelete,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "Removing shopping list item failed.",
    };
  }
};

/**
 *	Updates an Item in the database
 *
 * @param { ItemData }itemData
 * @returns {Promise<DefaultResponse>}
 */
export const updateItem = async (
  itemData: ItemData
): Promise<DefaultResponse> => {
  try {
    const { data } = await axios.patch<DefaultResponse>(
      `${DefaultURL}/shoppingList/item`,
      {
        itemData,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "Updating item failed.",
    };
  }
};

export interface GroceryItemData {
  _id: null;
  name: string;
  // Store<string> === DB store; Store<null> === new Store
  store: Store<string> | Store<null>;
  aisle: Aisle<string> | Aisle<null>;
  quantity: string;
}
export const addNewGroceryItem = async ({
  _id,
  name,
  store,
  aisle,
  quantity,
}: GroceryItemData): Promise<DefaultResponse> => {
  try {
    const { data } = await axios.post<DefaultResponse>(
      `${DefaultURL}/shoppingList/groceryItem`,
      {
        itemData: {
          _id,
          name,
          store,
          aisle,
          quantity,
        },
      }
    );
    return {
      status: 200,
      message: "Grocery Item addeded successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "Adding Grocery Item failed.",
    };
  }
};
