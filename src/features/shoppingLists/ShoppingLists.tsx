import React from "react";

import { useQuery } from "react-query";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";

import {
  fetchShoppingLists,
  fetchStores,
  ShoppingList,
} from "./shoppingListsApi";
import { ShoppingListsHeader } from "./ShoppingList.style";
import ShoppingListCard from "./ShoppingListCard/ShoppingListCard";

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

  return (
    <Container>
      <ShoppingListsHeader>Shopping Lists</ShoppingListsHeader>
      {isFetching && !isRefetching && <Spinner animation="border" />}
      {isFetched && (
        <Row>
          {shoppingLists?.map((shoppingList: ShoppingList) => (
            <ShoppingListCard
              shoppingList={shoppingList}
              storesList={storesAreFetched ? stores : []}
              key={`shoppingList-${shoppingList._id}`}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ShoppingLists;
