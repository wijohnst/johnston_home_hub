import React from "react";

import { useForm, Controller, useWatch } from "react-hook-form";

import { useMutation, useQueryClient } from "react-query";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  addItemToShoppingList,
  ShoppingListCategoriesEnum,
} from "../shoppingListsApi";

import { SubmitButton, Quantity, Store, Aisle } from "./AddItemForm.style";
import { AislesEnum, QuantityUnitsEnum } from "../../../constants";

type Props = {
  category: ShoppingListCategoriesEnum;
  handleCancel: () => void;
  stores: string[];
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

  //TODO - Persist custom units / move to BE for quantities
  const qunatityUnits = React.useMemo(
    () => Object.values(QuantityUnitsEnum),
    []
  );

  const aisles = React.useMemo(() => Object.values(AislesEnum), []);

  const queryClient = useQueryClient();

  const addShoppingListItemMutation = useMutation(
    "addShoppingListItem",
    (data: { _id: string; itemData: any }) => {
      console.log("Mutation", data._id);
      console.log("Mutation", data.itemData);
      return addItemToShoppingList(data._id, data.itemData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("shoppingLists");
        handleCancel();
      },
    }
  );

  const onSubmit = (data: { [key: string]: string }) => {
    const quantityString = `${data.ammount} ${data.unit}`;
    const itemData = {
      name: data.name,
      quantity: quantityString,
      store: data.store,
      url: data.url ?? null,
      aisle: data.aisle ?? null,
    };

    addShoppingListItemMutation.mutate({ _id, itemData });

    // console.log(itemData);
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
        <>
          <Form.Group className="mb-3">
            <Form.Label>Aisle</Form.Label>
          </Form.Group>
          <Aisle>
            <Controller
              control={control}
              name="aisle"
              render={({ field: { onChange } }) => {
                if (!isCustomAisle) {
                  return (
                    <Form.Select onChange={onChange}>
                      <option>Please select an aisle.</option>
                      {aisles.map((aisle: string) => (
                        <option key={`option-${aisle}`} value={aisle}>
                          {aisle}
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
          </Aisle>
        </>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Store Name</Form.Label>
        <Store>
          <Controller
            control={control}
            name="store"
            render={({ field: { onChange } }) => {
              if (!isCustomStore) {
                return (
                  <Form.Select onChange={onChange}>
                    <option>Please select a store.</option>
                    {stores.map((store: string) => (
                      <option key={`option-${store}`} value={store}>
                        {store}
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
        </Store>
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
