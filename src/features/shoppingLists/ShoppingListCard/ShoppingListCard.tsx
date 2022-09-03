import React from "react";

import { useMutation, useQueryClient } from "react-query";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import useMediaQuery from "../../../hooks/useMediaQuery";
import { Breakpoints } from "../../../constants";

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

import { getDataToShare } from "./getDataToShare";

import {
  StoreButtons as StoreButtonsWrapper,
  StoresHeading,
  SubmitButton,
  ShoppingListCardWrapper,
  EditListLink,
  EditItemBadge,
  CardHeader,
  ShareIconWrapper,
} from "./ShoppingListCard.style";

import AddItemForm from "../AddItemForm/AddItemForm";
import EditItemForm from "../EditItemForm/EditItemForm";

import { ReactComponent as ShareIcon } from "../../../assets/images/share_icon.svg";

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
  const [itemToEdit, setItemToEdit] = React.useState<AllItemsUnion | undefined>(
    undefined
  );
  const [isEdit, setIsEdit] = React.useState(false);
  const [idsToDelete, setIdsToDelete] = React.useState<string[]>([]);

  const isMobile = useMediaQuery(Breakpoints.mobile);

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
        QueryClient.invalidateQueries("shoppingLists");
        setIsEdit(false);
      },
    }
  );

  /**
   * Event handler for ShareIcon click
   */
  const handleShareClick = async (): Promise<void> => {
    const targetShoppingList: ShoppingList = {
      ...shoppingList,
      items: targetItems,
    };
    const dataToShare: ShareData = getDataToShare(
      targetShoppingList,
      targetStore
    );

    try {
      // Checks that the user's browser supports the `shareApi`
      if (navigator && navigator.share) {
        console.log("Sharing data...");
        const result = await navigator.share(dataToShare);
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ShoppingListCardWrapper>
      <Card>
        <Card.Body>
          <CardHeader>
            <Card.Title>{shoppingList.category}</Card.Title>
            {/* Web Share API has limited browser support. (Not supported by Chrome on Mac) */}
            {navigator && navigator.share && (
              <ShareIconWrapper onClick={handleShareClick}>
                <ShareIcon />
              </ShareIconWrapper>
            )}
          </CardHeader>
          <StoreButtonsWrapper>
            <StoresHeading>Stores:</StoresHeading>
            {!isMobile && storeIds.length <= 4 && (
              <StoreButtonsGroup
                stores={stores}
                storeIds={storeIds}
                targetStore={targetStore}
                handleStoreSelection={(storeId: string) =>
                  setTargetStore(storeId)
                }
              />
            )}
            {(isMobile || storeIds.length > 4) && (
              <StoreSelectDropdown
                stores={stores}
                storeIds={storeIds}
                handleStoreSelection={(storeName) => setTargetStore(storeName)}
              />
            )}
            <EditListLink
              className="text-primary"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit List
            </EditListLink>
          </StoreButtonsWrapper>
          <ListGroup as="ol" numbered={!isEdit}>
            {/*
							The following `sort` function is some of the hackiest code in the code base. Trying to discriminate the entry type for `AllItemsUnion[]` proved difficult to figure out. This is a band-aid until something more long-term can be implemented. 
						*/}
            {targetItems
              .sort((itemA, itemB) => {
                if ("aisle" in itemA && "aisle" in itemB) {
                  // @ts-ignore
                  let aisleA = itemA.aisle.aisle.toLowerCase();
                  // @ts-ignore
                  let aisleB = itemB.aisle.aisle.toLowerCase();
                  if (aisleA > aisleB) {
                    return 1;
                  }
                  if (aisleA < aisleB) {
                    return -1;
                  }
                  return 0;
                } else {
                  return 0;
                }
              })
              .map((item: Item | GroceryItem | OnlineItem, index: number) => (
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
                      <Card.Link href={`${item.url}`} target="_blank">
                        Link
                      </Card.Link>
                    )}
                  </div>
                  {!isEdit && (
                    <Badge bg="success" pill>
                      {item.quantity}
                    </Badge>
                  )}
                  {isEdit && (
                    <EditItemBadge
                      bg="warning"
                      pill
                      onClick={() => [setItemToEdit(item), setIsEdit(false)]}
                    >
                      Edit Item
                    </EditItemBadge>
                  )}
                </ListGroup.Item>
              ))}
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
          {!!itemToEdit && (
            <EditItemForm
              itemToEdit={itemToEdit}
              handleCancel={() => setItemToEdit(undefined)}
              aisles={aisles}
              stores={categoryStores}
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

/* SUB-COMPONENTS */

type StoreButtonsGroupProps = {
  stores: Store[];
  storeIds: string[];
  targetStore: string;
  handleStoreSelection: (storeId: string) => void;
};
const StoreButtonsGroup = ({
  stores,
  storeIds,
  targetStore,
  handleStoreSelection,
}: StoreButtonsGroupProps) => {
  return (
    <ButtonGroup>
      {storeIds.map((storeId: string) => {
        const [store] = stores.filter((store) => store._id === storeId);
        return (
          <Button
            variant={targetStore === store?.name ? "primary" : "secondary"}
            onClick={() => handleStoreSelection(store?.name ?? "")}
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
        onClick={() => handleStoreSelection("all")}
      >
        All Stores
      </Button>
    </ButtonGroup>
  );
};

type StoreSelectDropdownProps = {
  stores: Store[];
  storeIds: string[];
  handleStoreSelection: (storeId: string) => void;
};
const StoreSelectDropdown = ({
  stores,
  storeIds,
  handleStoreSelection,
}: StoreSelectDropdownProps) => {
  return (
    <>
      <Dropdown
        onSelect={(storeId) =>
          handleStoreSelection(
            stores.find((store: Store) => store._id === storeId)?.name ?? "all"
          )
        }
      >
        <Dropdown.Toggle>Stores</Dropdown.Toggle>
        <Dropdown.Menu>
          {storeIds.map((storeId: string) => (
            <Dropdown.Item eventKey={storeId}>
              {stores.find((store: Store) => store._id === storeId)?.name ?? ""}
            </Dropdown.Item>
          ))}
          <Dropdown.Item eventKey="all">All Stores</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ShoppingListCard;
