import React from "react";

import { useQuery } from "react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import {
  fetchShoppingLists,
  fetchStores,
  ShoppingList,
  getAllItems,
  getAllAisles,
  ItemData,
  Item,
} from "./shoppingListsApi";
import { ShoppingListsHeader } from "./ShoppingList.style";
import ShoppingListCard from "./ShoppingListCard/ShoppingListCard";
import { ShoppingModeModal } from "./shopping-mode/shopping-mode-modal/ShoppingModeModal";

type Props = {};

const ShoppingLists = (props: Props) => {
  const {
    isFetching,
    isRefetching,
    isFetched,
    data: shoppingLists,
  } = useQuery("shoppingLists", fetchShoppingLists);

  const { isFetched: storesAreFetched, data: stores = [] } = useQuery(
    "stores",
    fetchStores
  );

  const { isFetched: itemsAreFetched, data: allItems } = useQuery(
    "allItems",
    getAllItems
  );

  const { isFetched: aislesAreFetched, data: aisles } = useQuery(
    "aisles",
    getAllAisles
  );

  const [shouldShowShoppingModeModal, setShouldShowShoppingModeModal] =
    React.useState(false);
  const [shoppingModeStoreName, setShoppingModeStoreName] = React.useState("");
  const [shoppingModeStoreItemData, setShoppingModeStoreItemData] =
    React.useState<ItemData[]>([]);

  const handleShopClick = (storeName: string, targetItems: Item[]) => {
    const itemDataArr: ItemData[] = targetItems.map((item: Item) => ({
      ...item,
      url: undefined,
      aisle: { _id: "1", aisle: "Aisle 1" },
    }));

    setShoppingModeStoreName(storeName);
    setShoppingModeStoreItemData(itemDataArr);
    setShouldShowShoppingModeModal(true);
  };

  return (
    <>
      <Container>
        <ShoppingListsHeader>Shopping Lists</ShoppingListsHeader>
        {isFetching && !isRefetching && <span>Fetching shopping lists...</span>}
        {isFetched && (
          <Row>
            {shoppingLists?.map((shoppingList: ShoppingList) => (
              <ShoppingListCard
                shoppingList={shoppingList}
                storesList={storesAreFetched ? stores : []}
                items={
                  itemsAreFetched && allItems
                    ? allItems[shoppingList.category.toLowerCase()]
                    : []
                }
                aisles={aislesAreFetched && aisles ? aisles : []}
                key={`shoppingList-${shoppingList._id}`}
                handleShopClick={(storeName: string, targetItems: Item[]) =>
                  handleShopClick(storeName, targetItems)
                }
              />
            ))}
          </Row>
        )}
      </Container>
      <ShoppingModeModal
        isShown={shouldShowShoppingModeModal}
        storeName={shoppingModeStoreName}
        storeItemData={shoppingModeStoreItemData}
        handleDoneShoppingClick={() => setShouldShowShoppingModeModal(false)}
      />
    </>
  );
};

export default ShoppingLists;
