import React from "react";

import { useMutation } from "react-query";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { NewRecipeModalWrapper } from "./NewRecipeModal.style";
import { generateRecipe } from "../recipesApi";
import EditGeneratedRecipe from "../EditGeneratedRecipe/EditGeneratedRecipe";

type Props = {
  isShown: boolean;
  handleHide: () => void;
};

const NewRecipeModal = ({ isShown, handleHide }: Props) => {
  const { handleSubmit, control } = useForm();

  const { mutateAsync, data, isLoading, reset } = useMutation(
    `generateRecipe`,
    generateRecipe
  );

  const onSubmit = async (formData: FieldValues) => {
    await mutateAsync({ url: formData.url });
  };

  const url = useWatch({
    control,
    name: "url",
  });

  return (
    <Modal show={isShown} onHide={() => [handleHide(), reset()]} size="lg">
      <NewRecipeModalWrapper onSubmit={handleSubmit(onSubmit)}>
        {isLoading && (
          <>
            <span>Generating Recipe...</span>
            <Spinner animation="border" />
          </>
        )}
        {!isLoading && (
          <>
            {!data && (
              <>
                <h1>Add a new recipe</h1>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Copy a recipe from the web.</Form.Label>
                    <Controller
                      control={control}
                      name="url"
                      render={({ field: { onChange } }) => (
                        <Form.Control
                          type="text"
                          placeholder="Paste a recipe URL"
                          onChange={onChange}
                        />
                      )}
                    />
                  </Form.Group>
                  <Button type="submit">Get Recipe</Button>
                </Form>
              </>
            )}
            {data && (
              <EditGeneratedRecipe
                name={data.name ?? ""}
                ingredients={data.ingredients ?? []}
                steps={data.steps ?? []}
                url={url}
                handleCancelClick={handleHide}
              />
            )}
          </>
        )}
      </NewRecipeModalWrapper>
    </Modal>
  );
};

export default NewRecipeModal;
