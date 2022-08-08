import { Aisle, AllItemsUnion, Store } from "../shoppingListsApi";

export const getEntryValueById = <ReturnType>(
  entries: { _id: string }[],
  targetItemKey: string,
  targetItemId: string
): ReturnType | null => {
  const targetEntry: { [key: string]: any } | undefined = entries.find(
    (entry: { _id: string }) => entry._id === targetItemId
  );

  if (targetEntry) {
    return targetEntry[targetItemKey];
  } else {
    return null;
  }
};

/**
 * Returns a store object based on a matching _id string or returns a Store<undfined> object if the
 * user is creating a new store
 *
 * @param {boolean} isCustomStore
 * @param {store[]} stores
 * @param {AllItemsUnion} item
 * @param {string} storeDataFromForm
 * @returns {Store | Store<undefined>}
 */
export const getStoreDataFromForm = (
  isCustomStore: boolean,
  stores: Store[],
  item: AllItemsUnion,
  storeDataFromForm: string
): Store | Store<undefined> => {
  const newStore: Store<undefined> = {
    _id: undefined,
    name: storeDataFromForm,
    category: item.store.category,
  };

  if (isCustomStore) {
    return newStore;
  }

  return (
    stores.find((store: Store<string>) => store._id === storeDataFromForm) ??
    newStore
  );
};

export const getAisleDataFromForm = (
  isCustomAisle: boolean,
  aisles: Aisle[],
  item: AllItemsUnion,
  formAisleValue: string
): Aisle | Aisle<undefined> => {
  const newAisle: Aisle<undefined> = {
    _id: undefined,
    aisle: "aisle" in item ? item.aisle.aisle : "",
  };

  if (isCustomAisle) {
    return newAisle;
  }

  return (
    aisles.find((aisle: Aisle<string>) => aisle.aisle === formAisleValue) ??
    newAisle
  );
};
