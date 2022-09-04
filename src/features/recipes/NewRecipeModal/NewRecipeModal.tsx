import React from "react";

import { useMutation } from "react-query";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";

import { NewRecipeModalWrapper } from "./NewRecipeModal.style";
import { generateRecipe } from "../recipesApi";
import EditGeneratedRecipe from "../EditGeneratedRecipe/EditGeneratedRecipe";

type Props = {
  isShown: boolean;
  handleHide: () => void;
};

const NewRecipeModal = ({ isShown, handleHide }: Props) => {
  const { handleSubmit, control } = useForm();

  const [postStatus, setPostStatus] = React.useState<string | null>(null);

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
    defaultValue: null,
  });

  const handleNewRecipePostSuccess = (): void => {
    setPostStatus("success");
  };

  return (
    <Modal
      show={isShown}
      onHide={() => [handleHide(), reset(), setPostStatus(null)]}
      size="lg"
    >
      <NewRecipeModalWrapper onSubmit={handleSubmit(onSubmit)}>
        {isLoading && (
          <>
            <span>Generating Recipe...</span>
            <Spinner animation="border" />
          </>
        )}
        {!isLoading && (
          <>
            {!data && postStatus !== "success" && (
              <>
                <h1>Add a new recipe</h1>
                <Alert>
                  <p>
                    Please only use recipe links from AllRecipes.com. We will
                    support other sites in the future.
                  </p>
                </Alert>
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
            {data && postStatus !== "success" && (
              <EditGeneratedRecipe
                name={data.name ?? ""}
                ingredients={data.ingredients ?? []}
                steps={data.steps ?? []}
                url={url}
                handleCancelClick={handleHide}
                handleNewRecipePostSuccess={handleNewRecipePostSuccess}
              />
            )}
            {postStatus === "success" && (
              <section className="post-success-wrapper">
                <Alert>
                  <h3>New Recipe posted successfully.</h3>
                  <span>This window can be closed.</span>
                  <Stack direction="vertical" className="button-wrapper">
                    <Button
                      onClick={() => [
                        handleHide(),
                        reset(),
                        setPostStatus(null),
                      ]}
                    >
                      Close
                    </Button>
                  </Stack>
                </Alert>
              </section>
            )}
          </>
        )}
      </NewRecipeModalWrapper>
    </Modal>
  );
};

export default NewRecipeModal;
