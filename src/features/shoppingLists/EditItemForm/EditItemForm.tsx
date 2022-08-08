import React from "react";

import { useMutation, useQueryClient } from "react-query";
import { useForm, Controller, FieldValues, useWatch } from "react-hook-form";

import { QuantityUnitsEnum } from "../../../constants";
import {
  AllItemsUnion,
  Aisle,
  ItemData,
  Store,
  updateItem,
} from "../shoppingListsApi";

import Form from "react-bootstrap/form";
import Button from "react-bootstrap/Button";

import { SubmitButton, Quantity } from "../../../SharedStyles";
import {
  getAisleDataFromForm,
  getStoreDataFromForm,
} from "../AddItemForm/AddItemForm.utils";

type Props = {
  itemToEdit: AllItemsUnion;
  handleCancel: () => void;
  aisles: Aisle[];
  stores: Store[];
};

type FormInputs = {
  name: string;
  aisle: string;
  store: string;
  url: string;
  ammount: number;
  unit: string;
};

const EditItemForm = ({ itemToEdit, handleCancel, aisles, stores }: Props) => {
  const isGroceryItem = "aisle" in itemToEdit;
  const isOnlineItem = "url" in itemToEdit;

  const queryClient = useQueryClient();

  const updateItemMutation = useMutation(
    "updateItemMutation",
    (itemData: ItemData) => {
      return updateItem(itemData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("shoppingLists");
        isCustomStore && queryClient.invalidateQueries("stores");
        isCustomAisle && queryClient.invalidateQueries("aisles");
        handleCancel();
      },
    }
  );

  //TODO - Persist custom units / move to BE for quantities
  const quantityUnits = React.useMemo(
    () => Object.values(QuantityUnitsEnum),
    []
  );

  const [isCustomAisle, setIsCustomAisle] = React.useState(false);
  const [isCustomStore, setIsCustomStore] = React.useState(false);
  const [isCustomUnit, setIsCustomUnit] = React.useState(false);

  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      name: itemToEdit.name,
      aisle: isGroceryItem ? itemToEdit?.aisle.aisle : "",
      store: itemToEdit.store._id,
      url: isOnlineItem ? itemToEdit.url : "",
    },
  });

  const aisleValue = useWatch({
    control,
    name: "aisle",
  });

  React.useEffect(() => {
    if (aisleValue === "custom") {
      setIsCustomAisle(true);
    }
  }, [aisleValue]);

  const storeValue = useWatch({
    control,
    name: "store",
  });

  React.useEffect(() => {
    if (storeValue === "custom") {
      setIsCustomStore(true);
    }
  }, [storeValue]);

  const unitValue = useWatch({
    control,
    name: "unit",
  });

  React.useEffect(() => {
    if (unitValue === "custom") {
      setIsCustomUnit(true);
    }
  }, [unitValue]);

  const onSubmit = (data: FieldValues) => {
    console.log("raw data:", data);
    const quantityString = `${data.ammount} ${data.unit}`;

    const store = getStoreDataFromForm(
      isCustomStore,
      stores,
      itemToEdit,
      data.store
    );

    const aisle = getAisleDataFromForm(
      isCustomAisle,
      aisles,
      itemToEdit,
      data?.aisle ?? ""
    );

    const itemData: ItemData = {
      _id: itemToEdit._id,
      name: data.name,
      quantity: quantityString,
      store,
      aisle,
      url: data.url,
      category: itemToEdit.category,
    };

    updateItemMutation.mutate(itemData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ margin: "1rem 0 0 0" }}>
      <h4>{`Edit ${itemToEdit.name}`}</h4>
      <Form.Group className="mb-3">
        <Form.Label>Item Name</Form.Label>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Form.Control type="text" onChange={onChange} value={value} />
          )}
        />
      </Form.Group>
      {isGroceryItem && (
        <Form.Group className="mb-3">
          <Form.Label>Aisle</Form.Label>
          <Controller
            control={control}
            name="aisle"
            render={({ field: { onChange } }) => {
              if (!isCustomAisle) {
                return (
                  <Form.Select onChange={onChange}>
                    <option>Please select an aisle.</option>
                    {aisles.map((aisle: Aisle) => (
                      <option key={`option-${aisle._id}`} value={aisle._id}>
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
                    placeholder="Enter a custom aisle name."
                    onChange={onChange}
                  />
                );
              }
            }}
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Store Name</Form.Label>
        <Controller
          control={control}
          name="store"
          render={({ field: { onChange } }) => {
            if (!isCustomStore) {
              return (
                <Form.Select onChange={onChange}>
                  <option>Please select a store.</option>
                  {stores.map((store: Store) => (
                    <option key={`option-${store._id}`} value={store._id}>
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
      </Form.Group>
      {isOnlineItem && (
        <Form.Group className="mb-3">
          <Form.Label>Link</Form.Label>
          <Controller
            control={control}
            name="url"
            render={({ field: { onChange, value } }) => (
              <Form.Control
                type="text"
                placeholder="Add link to produce"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Form.Group>
      )}
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
                    {quantityUnits.map((unit: string) => (
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
        </Quantity>
      </Form.Group>
      <SubmitButton>
        <Button type="submit">Update Item</Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </SubmitButton>
    </Form>
  );
};

export default EditItemForm;
