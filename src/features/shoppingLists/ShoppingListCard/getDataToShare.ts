import {
  AllItemsUnion,
  ShoppingList,
  ShoppingListCategoriesEnum,
  GroceryItem,
  OnlineItem,
} from "../shoppingListsApi";

/**
 * Returns a string that can be shared via Web Share API representing a given ShoppingList
 *
 * @param {AllItemsUnion[]} items
 * @param {ShoppingListCategoriesEnum} listCategory
 * @returns {string}
 */
export const getTextFromItems = (
  items: AllItemsUnion[],
  listCategory: ShoppingListCategoriesEnum
): string => {
  if (listCategory === ShoppingListCategoriesEnum.GROCERY) {
    return items.reduce<string>((list: string, item: AllItemsUnion) => {
      const groceryItem = item as GroceryItem;
      return (
        list +
        `- ITEM: ${groceryItem.name}, AISLE: ${groceryItem.aisle.aisle}, QUANTITY: ${groceryItem.quantity} \n`
      );
    }, "");
  }
  if (listCategory === ShoppingListCategoriesEnum.ONLINE) {
    return items.reduce<string>((list: string, item: AllItemsUnion) => {
      const onlineItem = item as OnlineItem;
      return (
        list +
        `- ITEM: ${onlineItem.name}, RETAILER: ${onlineItem.store.name}, QUANTITY: ${onlineItem.quantity} \n`
      );
    }, "");
  } else {
    return items.reduce<string>((list: string, item: AllItemsUnion) => {
      return list + `- ITEM: ${item.name}, QUANTITY: ${item.quantity} \n`;
    }, "");
  }
};

/**
 * Accepts a ShoppingList and returns that list as sharable data for the Web Share API
 *
 * @param {ShoppingList} shoppingList
 * @returns {ShareData}
 */
export const getDataToShare = (
  shoppingList: ShoppingList,
  targetStore: string
): ShareData => {
  const listTitle =
    targetStore === "all"
      ? `${shoppingList.category} List (All Stores)`
      : `${targetStore} List`;
  return {
    title: listTitle,
    text: getTextFromItems(shoppingList.items, shoppingList.category),
  };
};
