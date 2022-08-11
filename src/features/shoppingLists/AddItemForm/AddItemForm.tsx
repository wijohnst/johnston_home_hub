import React from "react";

import { useForm, Controller, useWatch, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useMutation, useQueryClient } from "react-query";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import {
  addItemToShoppingList,
  ShoppingListCategoriesEnum,
  Store,
  Aisle,
  AllItemsUnion,
} from "../shoppingListsApi";

import { getEntryValueById } from "./AddItemForm.utils";

import { SubmitButton, Quantity } from "../../../SharedStyles";

import {
  Store as StoreWrapper,
  Aisle as AisleWrapper,
} from "./AddItemForm.style";

import { QuantityUnitsEnum } from "../../../constants";
import AutoCompleteInput from "../../../components/AutoCompleteInput/AutoCompleteInput";

type Props = {
  category: ShoppingListCategoriesEnum;
  handleCancel: () => void;
  stores: Store[];
  _id: string;
  items: AllItemsUnion[];
  aisles: Aisle[];
};

const AddItemForm = ({
  category,
  handleCancel,
  stores,
  _id: targetListId,
  items,
  aisles,
}: Props) => {
  const formSchema = yup.object().shape({
    name: yup.string().required("Please enter an item name."),
    aisle:
      category === ShoppingListCategoriesEnum.GROCERY
        ? yup.string().required("Please enter an aisle name.")
        : yup.string().nullable(),
    store: yup.string().required("Please enter a store name."),
    ammount: yup.string().required("Quantity is required."),
    unit: yup.string().required("Please select a unit."),
    url:
      category === ShoppingListCategoriesEnum.ONLINE
        ? yup.string().required("Please enter a link to the product")
        : yup.string().nullable(),
  });

  const { handleSubmit, control, setValue, formState } = useForm({
    resolver: yupResolver(formSchema),
    context: { category: category },
  });

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

  const nameValue = useWatch({
    control,
    name: "name",
  });

  const [isCustomUnit, setIsCustomUnit] = React.useState(false);
  const [isCustomStore, setIsCustomStore] = React.useState(false);
  const [isCustomAisle, setIsCustomAisle] = React.useState(false);
  const [suggestedItem, setSuggestedItem] = React.useState<any | undefined>(
    undefined
  );

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

  React.useEffect(() => {
    //TODO: Fix typing of `matchedItem`
    const matchedItem = items.find(
      (item: AllItemsUnion) => item.name === nameValue
    );
    if (matchedItem) {
      const storeValue = getEntryValueById<string>(
        stores,
        "_id",
        // @ts-ignore - `matchedItem` typing is incorrect
        matchedItem.store
      );

      setSuggestedItem(matchedItem);
      setValue("store", storeValue);

      setValue(
        "aisle",
        //@ts-ignore - matchedItem is incorrectly typed
        getEntryValueById<string>(aisles, "_id", matchedItem.aisle)
      );
    } else {
      setSuggestedItem(undefined);
    }
  }, [nameValue, items, stores, aisles, setValue]);

  const queryClient = useQueryClient();

  //TODO - Persist custom units / move to BE for quantities
  const quantityUnits = React.useMemo(
    () => Object.values(QuantityUnitsEnum),
    []
  );

  const addShoppingListItemMutation = useMutation(
    "addShoppingListItem",
    //@ts-ignorets-ignore
    (data: { _id: string; itemData: any }) => {
      return addItemToShoppingList(data._id, data.itemData);
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

  const onSubmit = (data: FieldValues) => {
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

    const dbItemData = items.find(
      (item: AllItemsUnion) => item.name === data.name
    );

    const itemData = {
      _id: dbItemData?._id,
      name: data.name,
      quantity: quantityString,
      store: store,
      url: data.url ?? null,
      aisle: aisle,
      category: category,
    };

    console.log(itemData);

    addShoppingListItemMutation.mutate({ _id: targetListId, itemData });
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
      <h4>Add A New Item to List</h4>
      <Form.Group className="mb-3">
        <Form.Label>Item Name</Form.Label>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange }, fieldState: { error } }) => (
            <AutoCompleteInput
              onChange={onChange}
              properties={items.map((item: AllItemsUnion) => ({
                key: "name",
                suggestionMatcher: item.name,
              }))}
              isInvalid={!!formState.errors.name}
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
              render={({ field: { onChange }, fieldState: { error } }) => {
                if (!isCustomAisle && !suggestedItem) {
                  return (
                    <Form.Select onChange={onChange} isInvalid={!!error}>
                      <option>Please select an aisle.</option>
                      {aisles?.map((aisle: Aisle) => (
                        <option key={`option-${aisle.aisle}`} value={aisle._id}>
                          {aisle.aisle}
                        </option>
                      ))}
                      <option value="custom">Add a custom aisle?</option>
                    </Form.Select>
                  );
                }
                if (!isCustomAisle && suggestedItem) {
                  return (
                    <h3>
                      <Badge bg="success" pill>
                        {
                          aisles.find(
                            (aisle: Aisle) => aisle._id === suggestedItem.aisle
                          )?.aisle
                        }
                      </Badge>
                    </h3>
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
          {formState.errors.aisle && (
            //@ts-expect-error
            <Form.Text>{formState.errors.aisle.message}</Form.Text>
          )}
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Store Name</Form.Label>
        <StoreWrapper>
          <Controller
            control={control}
            name="store"
            render={({ field: { onChange }, fieldState: { error } }) => {
              if (!isCustomStore && !suggestedItem) {
                return (
                  <Form.Select onChange={onChange} isInvalid={!!error}>
                    <option>Please select a store.</option>
                    {stores.map((store: Store) => (
                      <option key={`option-${store.name}`} value={store._id}>
                        {store.name}
                      </option>
                    ))}
                    <option value="custom">Add a custom store?</option>
                  </Form.Select>
                );
              }
              if (!isCustomStore && suggestedItem) {
                return (
                  <h3>
                    <Badge bg="success" pill>
                      {
                        stores.find(
                          (store: Store) => store._id === suggestedItem.store
                        )?.name
                      }
                    </Badge>
                  </h3>
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
        {formState.errors.store && (
          //@ts-expect-error
          <Form.Text>{formState.errors.store.message}</Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Quantity>
          <Controller
            control={control}
            name="ammount"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Form.Control
                type="number"
                placeholder="Enter a number."
                onChange={onChange}
                isInvalid={!!error}
              />
            )}
          />
          <Controller
            control={control}
            name="unit"
            render={({ field: { onChange }, fieldState: { error } }) => {
              if (!isCustomUnit) {
                return (
                  <Form.Select onChange={onChange} isInvalid={!!error}>
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
          {isCustomUnit && (
            <span
              onClick={handleCustomUnitCancelClick}
              className="text-primary"
            >
              Cancel?
            </span>
          )}
        </Quantity>
        {formState.errors.unit && (
          <Form.Text>Please provide a quantity.</Form.Text>
        )}
      </Form.Group>
      {category === ShoppingListCategoriesEnum.ONLINE && (
        <Form.Group className="mb-3">
          <Form.Label>Link</Form.Label>
          <Controller
            control={control}
            name="url"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Form.Control
                type="text"
                placeholder="Add link to product."
                onChange={onChange}
                isInvalid={!!error}
              />
            )}
          />
          {formState.errors.url && (
            <Form.Text>Please enter a link to the product.</Form.Text>
          )}
        </Form.Group>
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
