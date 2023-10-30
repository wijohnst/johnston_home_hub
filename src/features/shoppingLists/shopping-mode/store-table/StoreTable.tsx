import * as React from "react";

import { SemanticWrapper } from "./StoreTable.style";
import { ItemData } from "../../shoppingListsApi";
import { ShoppingMode } from "../shoppingMode";
import { AisleTable } from "../aisle-table/AisleTable";

type Props = {
  itemData: ItemData[];
  storeName: string;
};

const getItemsByAisleMap = (
  itemData: ItemData[]
): ShoppingMode.ItemsByAisleMap => {
  return itemData.reduce(
    (itemsByAisleMap: ShoppingMode.ItemsByAisleMap, itemData: ItemData) => {
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
  itemData,
  storeName,
}: Props): React.ReactElement => {
  const itemByAisleMap = getItemsByAisleMap(itemData);

  return (
    <SemanticWrapper>
      <h1>{storeName}</h1>
      {Object.entries(itemByAisleMap).map(([aisleName, itemData]) => (
        <div className="table-wrapper">
          <AisleTable
            aisleName={aisleName}
            initialOpenState={true}
            storeItemData={itemData}
          />
        </div>
      ))}
    </SemanticWrapper>
  );
};
