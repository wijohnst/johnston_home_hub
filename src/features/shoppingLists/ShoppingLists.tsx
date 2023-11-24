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
  ShoppingListCategoriesEnum,
  GroceryItem,
} from "./shoppingListsApi";
import { ShoppingListsHeader } from "./ShoppingList.style";
import ShoppingListCard from "./ShoppingListCard/ShoppingListCard";
import { ShoppingModeModal } from "./shopping-mode/shopping-mode-modal/ShoppingModeModal";

type Props = {};

const ShoppingLists = (props: Props) => {
  const [shouldShowShoppingModeModal, setShouldShowShoppingModeModal] =
    React.useState(false);
  const [shoppingModeStoreName, setShoppingModeStoreName] = React.useState("");
  const [shoppingModeStoreItemData, setShoppingModeStoreItemData] =
    React.useState<ItemData[]>([]);

  const {
    isFetching,
    isRefetching,
    isFetched,
    data: shoppingLists,
  } = useQuery("shoppingLists", fetchShoppingLists, {
    enabled: !shouldShowShoppingModeModal,
  });

  const { isFetched: storesAreFetched, data: stores = [] } = useQuery(
    "stores",
    fetchStores,
    {
      enabled: !shouldShowShoppingModeModal,
    }
  );

  const { isFetched: itemsAreFetched, data: allItems } = useQuery(
    "allItems",
    getAllItems,
    {
      enabled: !shouldShowShoppingModeModal,
    }
  );

  const { isFetched: aislesAreFetched, data: aisles } = useQuery(
    "aisles",
    getAllAisles,
    {
      enabled: !shouldShowShoppingModeModal,
    }
  );

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
        groceryList={
          shoppingLists
            ?.filter(
              (shoppingList) =>
                shoppingList.category === ShoppingListCategoriesEnum.GROCERY
            )
            .map((shoppingList) =>
              shoppingList.items.filter(
                (item: Item) => item.store.name === shoppingModeStoreName
              )
            )
            .flat() as GroceryItem[]
        }
        handleDoneShoppingClick={() => setShouldShowShoppingModeModal(false)}
      />
    </>
  );
};

export default ShoppingLists;
