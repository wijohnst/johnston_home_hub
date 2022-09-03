import React from "react";
import Form from "react-bootstrap/Form";

import {
  Controller,
  useFormContext,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  addNewGroceryItem,
  fetchStores,
  getAllAisles,
  getAllItems,
  GroceryItem,
  GroceryItemData,
  ShoppingListCategoriesEnum,
  Store,
  Aisle,
} from "../../shoppingLists/shoppingListsApi";

import {
  IngredientFieldsWrapper,
  StepsFieldsWrapper,
} from "./EditRecipeForm.style";

import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { ReactComponent as LinkIcon } from "../../../assets/images/link_icon.svg";

type Props = {
  name: string;
  /** Basic string rerpresentation of an ingredient. Does not include details. IE: '6 ears corn' */
  ingredientsData: string[];
};

const EditRecipeForm = ({ name, ingredientsData }: Props) => {
  const queryClient = useQueryClient();

  const [targetIngredientIndex, setTargetIngredientIndex] = React.useState<
    number | null
  >(null);

  const [isAddNewGroceryItem, setIsAddNewGroceryItem] = React.useState(false);
  const [isNewStore, setIsNewStore] = React.useState(false);
  const [isNewAisle, setIsNewAisle] = React.useState(false);

  const { control, setValue } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: "ingredients",
  });

  const ingredients = useWatch({
    control,
    name: "ingredients",
  });

  const { isFetched: itemsAreFetched, data: allItems } = useQuery(
    "allItems",
    getAllItems
  );

  const { data: stores = [] } = useQuery("stores", fetchStores);

  const groceryStores = React.useMemo(() => {
    return stores.filter(
      (store: Store) => store.category === ShoppingListCategoriesEnum.GROCERY
    );
  }, [stores]);

  const newItemValues = useWatch({
    control,
    name: "newGroceryItem",
    defaultValue: {
      name: "",
      store: "",
      aisle: "",
    },
  });

  React.useEffect(() => {
    if (newItemValues.store === "custom") {
      setIsNewStore(true);
    }
  }, [newItemValues]);

  const { data: aisles = [] } = useQuery("aisles", getAllAisles);

  React.useEffect(() => {
    if (newItemValues.aisle === "custom") {
      setIsNewAisle(true);
    }
  }, [newItemValues]);

  const ingredientGroceryItems: GroceryItem[] | undefined =
    React.useMemo(() => {
      return allItems?.grocery
        .filter(
          (groceryItem: GroceryItem) =>
            !["Health & Beauty", "Household", "Baby"].includes(
              groceryItem.aisle.aisle
            )
        )
        .sort((groceryItemA, groceryItemB) => {
          const { name: nameA } = groceryItemA;
          const { name: nameB } = groceryItemB;

          if (nameA?.toLowerCase() > nameB?.toLowerCase()) {
            return 1;
          }

          if (nameA?.toLowerCase() < nameB?.toLowerCase()) {
            return -1;
          }

          return 0;
        });
    }, [allItems]);

  const addNewGroceryItemMutation = useMutation(
    "addNewGroceryItemMutation",
    (groceryItemData: GroceryItemData) => {
      return addNewGroceryItem(groceryItemData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allItems");
        setIsAddNewGroceryItem(false);
        setIsNewStore(false);
        setIsNewAisle(false);
      },
    }
  );

  const handleCancelLinkClick = (): void => {
    setIsAddNewGroceryItem(false);
    setValue("newGroceryItem", "");
  };
  /**
   * Event handler for submitting a new Grocery Item
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleNewGroceryItemClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    const [targetStore]: Store<string>[] | undefined = groceryStores.filter(
      (store: Store) => store._id === newItemValues.store
    );

    const [targetAisle]: Aisle<string>[] | undefined = aisles?.filter(
      (aisle: Aisle<string>) => aisle._id === newItemValues.aisle
    );

    addNewGroceryItemMutation.mutate({
      _id: null,
      name: newItemValues.name,
      quantity: newItemValues.quantity,
      store: targetStore
        ? targetStore
        : {
            _id: null,
            name: newItemValues.store,
            category: "Grocery",
          },
      aisle: targetAisle
        ? targetAisle
        : {
            _id: null,
            aisle: newItemValues.aisle,
          },
    });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: 600 }}>Recipe Name</Form.Label>
        <Container>
          <Controller
            control={control}
            defaultValue={name}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Form.Control type="text" value={value} onChange={onChange} />
            )}
          />
        </Container>
      </Form.Group>
      <IngredientFieldsWrapper>
        <Form.Label style={{ fontWeight: 600 }}>Ingredients</Form.Label>
        {fields.map((field, index) => (
          <>
            <Stack direction="horizontal" gap={2}>
              <div className="ingredient-label center-label name-column">
                <Form.Label className="ingredient-label">Name</Form.Label>
                <Controller
                  control={control}
                  name={`ingredients[${index}].name`}
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      placeholder="Please enter an ingredient name."
                    />
                  )}
                />
              </div>
              <div className="ingredient-label center-label quantity-column">
                <Form.Label className="ingredient-label center-label">
                  Quantity
                </Form.Label>
                <Controller
                  control={control}
                  name={`ingredients[${index}].quantity`}
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="number"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div className="ingredient-label center-label">
                <Form.Label className="ingredient-label center-label">
                  Unit
                </Form.Label>
                <Controller
                  control={control}
                  name={`ingredients[${index}].unit`}
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="text"
                      value={value}
                      onChange={onChange}
                      placeholder="Please enter a unit."
                    />
                  )}
                />
              </div>
              {ingredients[index]?.linkedItem === null && (
                <div
                  className="link-column"
                  onClick={() => setTargetIngredientIndex(index)}
                >
                  <Form.Label className="ingredient-label center-label"></Form.Label>
                  <div>
                    <LinkIcon style={{ width: "24px" }} role="button" />
                  </div>
                </div>
              )}
            </Stack>
            {targetIngredientIndex === index && (
              <div className="link-item-section">
                <Stack gap={1}>
                  {!isAddNewGroceryItem ? (
                    <Alert>
                      {ingredients[index]?.linkedItem === null && (
                        <>
                          <h5>Link a Grocery Item to this Ingredient</h5>
                          <p>
                            This allows integration between your recipes and
                            your shopping lists. Linked items will be added to
                            your shopping list whenever a recipe is added to
                            your meal schedule.
                          </p>
                        </>
                      )}
                      {ingredients[index]?.linkedItem !== null && (
                        <>
                          <h5>Ingredient successfully linked.</h5>
                        </>
                      )}
                    </Alert>
                  ) : (
                    <Alert>
                      <h5>Add a new Grocery Item</h5>
                      <p>
                        Didn't see the item you were looking for? Add it here
                        and it will be automatically linked to this ingredient
                        from the recipe:
                        <span className="ingredient-alert-string">
                          {ingredientsData[index]}
                        </span>
                      </p>
                    </Alert>
                  )}
                  {itemsAreFetched && !isAddNewGroceryItem && (
                    <>
                      <Form.Label>Grocery Item to Link</Form.Label>
                      <Stack className="link-inputs-wrapper">
                        <Controller
                          control={control}
                          name={`ingredients[${index}].linkedItem`}
                          render={({ field: { onChange } }) => (
                            <Form.Select onChange={onChange}>
                              <option>
                                Please select a Grocery Item to link
                              </option>
                              {ingredientGroceryItems?.map(
                                (groceryItem: GroceryItem) => (
                                  <option value={groceryItem._id}>
                                    {groceryItem.name}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          )}
                        />
                        <span
                          className="link-span"
                          onClick={() => setIsAddNewGroceryItem(true)}
                        >
                          Add new Grocery Item
                        </span>
                        <div className="link-item-controls">
                          <Button
                            variant="danger"
                            onClick={() => {
                              if (ingredients[index]?.linkedItem === null) {
                                setTargetIngredientIndex(null);
                              } else {
                                setValue(
                                  `ingredients.${index}.linkedItem`,
                                  null
                                );
                              }
                            }}
                          >
                            {ingredients[index]?.linkedItem === null
                              ? "Cancel"
                              : "Unlink Item"}
                          </Button>
                        </div>
                      </Stack>
                    </>
                  )}
                </Stack>
                {isAddNewGroceryItem && (
                  <div className="add-item-form-wrapper">
                    <Stack className="link-sub-form" gap={1}>
                      <h4>Add New Grocery Item</h4>
                      <Form.Label>New Item Name</Form.Label>
                      <Controller
                        control={control}
                        name={`newGroceryItem.name`}
                        render={({ field: { onChange, value } }) => (
                          <Form.Control
                            type="text"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <Form.Label>Store</Form.Label>
                      {!isNewStore ? (
                        <Controller
                          control={control}
                          name={`newGroceryItem.store`}
                          render={({ field: { onChange } }) => (
                            <Form.Select onChange={onChange}>
                              <option>Please select a store.</option>
                              {groceryStores.map((store: Store) => (
                                <option value={store._id}>{store.name}</option>
                              ))}
                              <option value="custom">Add a new store</option>
                            </Form.Select>
                          )}
                        />
                      ) : (
                        <Controller
                          control={control}
                          name={`newGroceryItem.store`}
                          render={({ field: { onChange, value } }) => (
                            <Form.Control
                              type="text"
                              onChange={onChange}
                              value={value === "custom" ? "" : value}
                            />
                          )}
                        />
                      )}
                      <Form.Label>Aisle</Form.Label>
                      {!isNewAisle ? (
                        <Controller
                          control={control}
                          name={`newGroceryItem.aisle`}
                          render={({ field: { onChange } }) => (
                            <Form.Select onChange={onChange}>
                              <option>Please select an aisle.</option>
                              {aisles.map((aisle: Aisle) => (
                                <option value={aisle._id}>{aisle.aisle}</option>
                              ))}
                              <option value="custom">Add new aisle?</option>
                            </Form.Select>
                          )}
                        />
                      ) : (
                        <Controller
                          control={control}
                          name={`newGroceryItem.aisle`}
                          render={({ field: { onChange, value } }) => (
                            <Form.Control
                              type="text"
                              value={value === "custom" ? "" : value}
                              onChange={onChange}
                            />
                          )}
                        />
                      )}
                      <div className="sub-form-controls">
                        <Button
                          onClick={(event) => handleNewGroceryItemClick(event)}
                        >
                          {" "}
                          Save Item
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleCancelLinkClick()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Stack>
                  </div>
                )}
              </div>
            )}
          </>
        ))}
        <span
          className="link-span add-ingredient-link"
          onClick={() =>
            append({ name: "", quantity: null, unit: null, linkedItem: null })
          }
        >
          Add Ingredient
        </span>
      </IngredientFieldsWrapper>
      <StepsFieldsWrapper>
        <Form.Label style={{ fontWeight: 600 }}>Steps</Form.Label>
        <Controller
          control={control}
          name={`steps`}
          render={({ field: { onChange, value } }) => (
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </StepsFieldsWrapper>
    </>
  );
};

export default EditRecipeForm;