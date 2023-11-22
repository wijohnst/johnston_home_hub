import * as React from "react";

import { SemanticWrapper } from "./StoreTable.style";
import { GroceryItem } from "../../shoppingListsApi";
import { ShoppingMode } from "../shoppingMode";
import { AisleTable } from "../aisle-table/AisleTable";

type Props = {
  groceryList: GroceryItem[];
  storeName: string;
};

const getItemsByAisleMap = (
  itemData: GroceryItem[]
): ShoppingMode.ItemsByAisleMap => {
  return itemData.reduce(
    (itemsByAisleMap: ShoppingMode.ItemsByAisleMap, itemData: GroceryItem) => {
      const { aisle } = itemData;
      if (!itemsByAisleMap[aisle.aisle]) {
        itemsByAisleMap[aisle.aisle] = [];
      }
      itemsByAisleMap[aisle.aisle].push(itemData);
      return itemsByAisleMap;
    },
    {}
  );
};
export const StoreTable = ({
  groceryList,
  storeName,
}: Props): React.ReactElement => {
  const itemByAisleMap = getItemsByAisleMap(groceryList);

  return (
    <SemanticWrapper>
      <h1>{storeName}</h1>
      {Object.entries(itemByAisleMap).map(([aisleName, itemData], index) => (
        <div className="table-wrapper" key={`AisleTable-${index}`}>
          <AisleTable
            aisleName={aisleName}
            initialOpenState={index === 0 ? true : false}
            storeItemData={itemData}
          />
        </div>
      ))}
    </SemanticWrapper>
  );
};
