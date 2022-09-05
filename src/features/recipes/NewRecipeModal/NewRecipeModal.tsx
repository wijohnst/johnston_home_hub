import React from "react";

import { useMutation } from "react-query";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import CloseButton from "react-bootstrap/CloseButton";

import { NewRecipeModalWrapper } from "./NewRecipeModal.style";
import { generateRecipe } from "../recipesApi";
import EditGeneratedRecipe from "../EditGeneratedRecipe/EditGeneratedRecipe";

type Props = {
  isShown: boolean;
  handleHide: () => void;
};

const NewRecipeModal = ({ isShown, handleHide }: Props) => {
  const { handleSubmit, control, reset: resetForm } = useForm();

  const [postStatus, setPostStatus] = React.useState<string | null>(null);
  const [isManualEntry, setIsManualEntry] = React.useState<boolean>(false);

  const {
    mutateAsync,
    data,
    isLoading,
    reset: resetMutation,
  } = useMutation(`generateRecipe`, generateRecipe);

  const onSubmit = async (formData: FieldValues) => {
    await mutateAsync({ url: formData.url });
  };

  const url = useWatch({
    control,
    name: "url",
    defaultValue: null,
  });

  React.useEffect(() => {
    if (url !== null) {
      setIsManualEntry(false);
    }
  }, [url]);

  const handleNewRecipePostSuccess = (): void => {
    setPostStatus("success");
  };

  const handleModalClose = () => [
    handleHide(),
    resetMutation(),
    setPostStatus(null),
    setIsManualEntry(false),
    resetForm(),
  ];

  return (
    <Modal show={isShown} onHide={() => handleModalClose()} size="lg">
      <NewRecipeModalWrapper onSubmit={handleSubmit(onSubmit)}>
        {isLoading && (
          <section>
            <span>Generating Recipe...</span>
            <Spinner animation="border" />
          </section>
        )}
        {!isLoading && (
          <>
            <div className="close-button-wrapper">
              <CloseButton onClick={() => handleModalClose()} />
            </div>
            {!data && postStatus !== "success" && !isManualEntry && (
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
                  <Stack
                    className="new-recipe-modal-controls"
                    direction="horizontal"
                    gap={1}
                  >
                    <Button type="submit" disabled={!url}>
                      Get Recipe
                    </Button>
                    <Button
                      onClick={() => setIsManualEntry(true)}
                      disabled={url}
                    >
                      Add Manually
                    </Button>
                  </Stack>
                </Form>
              </>
            )}
            {data && postStatus !== "success" && !isManualEntry && (
              <EditGeneratedRecipe
                name={data.name ?? ""}
                ingredients={data.ingredients ?? []}
                steps={data.steps ?? []}
                url={url}
                recipeId={null}
                handleCancelClick={() => handleModalClose()}
                handleNewRecipePostSuccess={handleNewRecipePostSuccess}
              />
            )}
            {isManualEntry && (
              <EditGeneratedRecipe
                name={""}
                ingredients={[]}
                steps={[]}
                url={null}
                recipeId={null}
                isManualEntry={isManualEntry}
                handleCancelClick={() => setIsManualEntry(false)}
                handleNewRecipePostSuccess={handleNewRecipePostSuccess}
              />
            )}
            {postStatus === "success" && (
              <section className="post-success-wrapper">
                <Alert>
                  <h3>New Recipe posted successfully.</h3>
                  <span>This window can be closed.</span>
                  <Stack direction="vertical" className="button-wrapper">
                    <Button onClick={() => handleModalClose()}>Close</Button>
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
