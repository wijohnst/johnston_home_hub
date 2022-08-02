import React from "react";

import { useForm, Controller, useWatch } from "react-hook-form";

import { useMutation, useQueryClient, useQuery } from "react-query";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  addItemToShoppingList,
  getAllAisles,
  ShoppingListCategoriesEnum,
  Store,
  Aisle,
} from "../shoppingListsApi";

import {
  SubmitButton,
  Quantity,
  Store as StoreWrapper,
  Aisle as AisleWrapper,
} from "./AddItemForm.style";
import { QuantityUnitsEnum } from "../../../constants";

type Props = {
  category: ShoppingListCategoriesEnum;
  handleCancel: () => void;
  stores: Store[];
  _id: string;
};
const AddItemForm = ({ category, handleCancel, stores, _id }: Props) => {
  const { handleSubmit, control, setValue } = useForm();
  const unitValue = useWatch({
    control,
    name: "unit",
  });

  const storeValue = useWatch({
    control,
    name: "store",
  });

  const aisleValue = useWatch({
    control,
    name: "aisle",
  });

  const [isCustomUnit, setIsCustomUnit] = React.useState(false);
  const [isCustomStore, setIsCustomStore] = React.useState(false);
  const [isCustomAisle, setIsCustomAisle] = React.useState(false);

  React.useEffect(() => {
    if (unitValue === "custom") {
      setIsCustomUnit(true);
    }
  }, [unitValue]);

  React.useEffect(() => {
    if (storeValue === "custom") {
      setIsCustomStore(true);
    }
  }, [storeValue]);

  React.useEffect(() => {
    if (aisleValue === "custom") {
      setIsCustomAisle(true);
    }
  }, [aisleValue]);

  const queryClient = useQueryClient();

  //TODO - Persist custom units / move to BE for quantities
  const qunatityUnits = React.useMemo(
    () => Object.values(QuantityUnitsEnum),
    []
  );

  const { isFetched: areIslesFetched, data: aisles } = useQuery(
    "aisles",
    getAllAisles
  );

  const addShoppingListItemMutation = useMutation(
    "addShoppingListItem",
    //@ts-ignorets-ignore
    (data: { _id: string; itemData: any }) => {
      return addItemToShoppingList(data._id, data.itemData);
    },
    {
      onSuccess: () => {
        console.log("Item added successfully...");
        queryClient.invalidateQueries("shoppingLists");
        isCustomStore && queryClient.invalidateQueries("stores");
        handleCancel();
      },
    }
  );

  const onSubmit = (data: { [key: string]: string }) => {
    const quantityString = `${data.ammount} ${data.unit}`;

    const store = isCustomStore
      ? {
          _id: null,
          name: data.store,
          category,
        }
      : stores.find((store) => store._id === data.store);

    const aisle: any = isCustomAisle
      ? {
          _id: null,
          aisle: data.aisle,
        }
      : aisles?.find((aisle) => aisle._id === data.aisle);

    const itemData = {
      name: data.name,
      quantity: quantityString,
      store,
      url: data.url ?? null,
      aisle: aisle,
      category: category,
    };

    addShoppingListItemMutation.mutate({ _id, itemData });
  };

  const handleCustomUnitCancelClick = () => {
    setIsCustomUnit(false);
    setValue("unit", null);
  };

  const handleCustomStoreCancelClick = () => {
    setIsCustomStore(false);
    setValue("store", null);
  };

  const handleCustomAisleCancelClick = () => {
    setIsCustomAisle(false);
    setValue("aisle", null);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ margin: "1rem 0 0 0" }}>
      <Form.Group className="mb-3">
        <Form.Label>Item Name</Form.Label>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange } }) => (
            <Form.Control
              type="text"
              placeholder="Enter an item name."
              onChange={onChange}
            />
          )}
        />
      </Form.Group>
      {category === ShoppingListCategoriesEnum.GROCERY && (
        <Form.Group className="mb-3">
          <Form.Label>Aisle</Form.Label>
          <AisleWrapper>
            <Controller
              control={control}
              name="aisle"
              render={({ field: { onChange } }) => {
                if (!isCustomAisle) {
                  return (
                    <Form.Select onChange={onChange}>
                      <option>Please select an aisle.</option>
                      {areIslesFetched &&
                        aisles?.map((aisle: Aisle) => (
                          <option
                            key={`option-${aisle.aisle}`}
                            value={aisle._id}
                          >
                            {aisle.aisle}
                          </option>
                        ))}
                      <option value="custom">Add a custom aisle?</option>
                    </Form.Select>
                  );
                } else {
                  return (
                    <Form.Control
                      type="text"
                      placeholder="Enter a custom aisle."
                      onChange={onChange}
                    />
                  );
                }
              }}
            />
            {isCustomAisle && (
              <span
                onClick={handleCustomAisleCancelClick}
                className="text-primary"
              >
                Cancel?
              </span>
            )}
          </AisleWrapper>
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Store Name</Form.Label>
        <StoreWrapper>
          <Controller
            control={control}
            name="store"
            render={({ field: { onChange } }) => {
              if (!isCustomStore) {
                return (
                  <Form.Select onChange={onChange}>
                    <option>Please select a store.</option>
                    {stores.map((store: Store) => (
                      <option key={`option-${store.name}`} value={store._id}>
                        {store.name}
                      </option>
                    ))}
                    <option value="custom">Add a custom store?</option>
                  </Form.Select>
                );
              } else {
                return (
                  <Form.Control
                    type="text"
                    placeholder="Enter a custom store."
                    onChange={onChange}
                  />
                );
              }
            }}
          />
          {isCustomStore && (
            <span
              onClick={handleCustomStoreCancelClick}
              className="text-primary"
            >
              Cancel?
            </span>
          )}
        </StoreWrapper>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Quantity>
          <Controller
            control={control}
            name="ammount"
            render={({ field: { onChange } }) => (
              <Form.Control
                type="number"
                placeholder="Enter a number."
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="unit"
            render={({ field: { onChange } }) => {
              if (!isCustomUnit) {
                return (
                  <Form.Select onChange={onChange}>
                    <option>Please select a unit.</option>
                    {qunatityUnits.map((unit: string) => (
                      <option key={`option-${unit}`} value={unit}>
                        {unit}
                      </option>
                    ))}
                    <option value="custom">Add a custom unit?</option>
                  </Form.Select>
                );
              } else {
                return (
                  <Form.Control
                    type="text"
                    onChange={onChange}
                    placeholder="Add a custom unit."
                  />
                );
              }
            }}
          />
          {isCustomUnit && (
            <span
              onClick={handleCustomUnitCancelClick}
              className="text-primary"
            >
              Cancel?
            </span>
          )}
        </Quantity>
      </Form.Group>
      {category === ShoppingListCategoriesEnum.ONLINE && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Link</Form.Label>
            <Controller
              control={control}
              name="url"
              render={({ field: { onChange } }) => (
                <Form.Control
                  type="text"
                  placeholder="Add link to product."
                  onChange={onChange}
                />
              )}
            />
          </Form.Group>
        </>
      )}
      <SubmitButton>
        <Button type="submit">{`Add to ${category} List`}</Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </SubmitButton>
    </Form>
  );
};

export default AddItemForm;
