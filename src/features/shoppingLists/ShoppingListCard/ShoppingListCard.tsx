import React from "react";

import { QueryClient, useMutation, useQueryClient } from "react-query";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {
  Aisle,
  AllItemsUnion,
  GroceryItem,
  Item,
  OnlineItem,
  removeItemFromShoppingList,
  ShoppingList,
  Store,
} from "../shoppingListsApi";

import {
  StoreButtons,
  StoresHeading,
  SubmitButton,
  ShoppingListCardWrapper,
  EditListLink,
} from "./ShoppingListCard.style";
import AddItemForm from "../AddItemForm/AddItemForm";

type Props = {
  shoppingList: ShoppingList;
  storesList: Store[];
  items: AllItemsUnion[];
  aisles: Aisle[];
};

const ShoppingListCard = ({
  shoppingList,
  storesList,
  items,
  aisles,
}: Props) => {
  const QueryClient = useQueryClient();

  const stores: Store[] = React.useMemo(
    () => shoppingList.items.map((item) => item.store),
    [shoppingList]
  );

  const categoryStores = storesList.filter(
    (store: Store) => store.category === shoppingList.category
  );

  const storeIds = Array.from(new Set(stores.map((store) => store._id)));

  const [targetStore, setTargetStore] = React.useState("all");
  const [showAddItemForm, setShowAddItemForm] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [idsToDelete, setIdsToDelete] = React.useState<string[]>([]);

  /*
		This filters the shoppingList `Items` that are shown, filtering based on store name
	*/
  const targetItems = React.useMemo(() => {
    if (targetStore === "all") {
      return shoppingList.items;
    }

    return shoppingList?.items.filter(
      (item: Item) => item.store.name === targetStore
    );
  }, [targetStore, shoppingList.items]);

  React.useEffect(() => {
    setIdsToDelete([]);
  }, [isEdit]);

  const removeShoppingListItemMutation = useMutation(
    "removeShoppingListItem",
    () => {
      return removeItemFromShoppingList(shoppingList._id, idsToDelete);
    },
    {
      onSuccess: () => {
        console.log("Items removed successfully...");
        QueryClient.invalidateQueries("shoppingLists");
        setIsEdit(false);
      },
    }
  );

  return (
    <ShoppingListCardWrapper>
      <Card>
        <Card.Body>
          <Card.Title>{shoppingList.category}</Card.Title>
          <StoreButtons>
            <StoresHeading>Stores:</StoresHeading>
            <ButtonGroup>
              {storeIds.map((storeId: string) => {
                const [store] = stores.filter((store) => store._id === storeId);
                return (
                  <Button
                    variant={
                      targetStore === store?.name ? "primary" : "secondary"
                    }
                    onClick={() => setTargetStore(store?.name)}
                    size="sm"
                    key={`${store?.name}-button`}
                  >
                    {store?.name}
                  </Button>
                );
              })}
              <Button
                variant={targetStore === "all" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setTargetStore("all")}
              >
                All Stores
              </Button>
            </ButtonGroup>
            <EditListLink
              className="text-primary"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit List
            </EditListLink>
          </StoreButtons>
          <ListGroup as="ol" numbered={!isEdit}>
            {targetItems.map(
              (item: Item | GroceryItem | OnlineItem, index: number) => (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  key={`listGroup-${index}`}
                >
                  {isEdit && (
                    <Form.Check
                      type="checkbox"
                      onClick={() => {
                        if (idsToDelete.includes(item._id)) {
                          setIdsToDelete(
                            idsToDelete.filter((id: string) => id !== item._id)
                          );
                        } else {
                          setIdsToDelete([...idsToDelete, item._id]);
                        }
                      }}
                    />
                  )}
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.name}</div>
                    {"aisle" in item && (
                      <span>{item?.aisle.aisle ?? "No Aisle"}</span>
                    )}
                    {"url" in item && (
                      <Card.Link href={`${item.url}`}>Link</Card.Link>
                    )}
                  </div>
                  <Badge bg="success" pill>
                    {item.quantity}
                  </Badge>
                </ListGroup.Item>
              )
            )}
          </ListGroup>
          {showAddItemForm && (
            <AddItemForm
              category={shoppingList.category}
              handleCancel={() => setShowAddItemForm(false)}
              stores={categoryStores}
              _id={shoppingList._id}
              items={items}
              aisles={aisles}
            />
          )}
          {!isEdit && (
            <SubmitButton>
              {!showAddItemForm && (
                <Button
                  variant="primary"
                  onClick={() => setShowAddItemForm(true)}
                >{`Add ${shoppingList.category} Item`}</Button>
              )}
            </SubmitButton>
          )}
          {isEdit && (
            <SubmitButton>
              <Button
                variant="danger"
                disabled={idsToDelete.length === 0}
                onClick={() => removeShoppingListItemMutation.mutate()}
              >{`Remove ${idsToDelete.length} items`}</Button>
            </SubmitButton>
          )}
        </Card.Body>
      </Card>
    </ShoppingListCardWrapper>
  );
};

export default ShoppingListCard;
