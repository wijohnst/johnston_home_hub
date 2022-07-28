import React from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import {
  GroceryItem,
  Item,
  OnlineItem,
  ShoppingList,
} from "../shoppingListsApi";

import {
  StoreButtons,
  StoresHeading,
  AddButton,
} from "./ShoppingListCard.style";
import AddItemForm from "../AddItemForm/AddItemForm";

type Props = {
  shoppingList: ShoppingList;
};

const ShoppingListCard = ({ shoppingList }: Props) => {
  const stores = React.useMemo(() => {
    return new Set(shoppingList.items.map((item: Item) => item.store));
  }, [shoppingList]);

  const [targetStore, setTargetStore] = React.useState("all");
  const [showAddItemForm, setShowAddItemForm] = React.useState(false);

  const targetItems = React.useMemo(() => {
    if (targetStore === "all") {
      return shoppingList.items;
    }

    return shoppingList.items.filter(
      (item: Item) => item.store === targetStore
    );
  }, [targetStore, shoppingList.items]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{shoppingList.category}</Card.Title>
        <StoreButtons>
          <StoresHeading>Stores:</StoresHeading>
          <ButtonGroup>
            {Array.from(stores).map((store: string) => (
              <Button
                variant={targetStore === store ? "primary" : "secondary"}
                onClick={() => setTargetStore(store)}
                size="sm"
                key={`${store}-button`}
              >
                {store}
              </Button>
            ))}
            <Button
              variant={targetStore === "all" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTargetStore("all")}
            >
              All Stores
            </Button>
          </ButtonGroup>
        </StoreButtons>
        <ListGroup as="ol" numbered>
          {targetItems.map(
            (item: Item | GroceryItem | OnlineItem, index: number) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={`listGroup-${index}`}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{item.name}</div>
                  {"aisle" in item && <span>{item.aisle}</span>}
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
            stores={Array.from(stores)}
            _id={shoppingList._id}
          />
        )}
        <AddButton>
          {!showAddItemForm && (
            <Button
              variant="primary"
              onClick={() => setShowAddItemForm(true)}
            >{`Add ${shoppingList.category} Item`}</Button>
          )}
        </AddButton>
      </Card.Body>
    </Card>
  );
};

export default ShoppingListCard;
