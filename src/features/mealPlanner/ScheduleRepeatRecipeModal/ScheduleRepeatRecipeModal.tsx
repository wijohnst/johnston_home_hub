import React from "react";

import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import ButtonBar from "../../../components/SharedComponents/ButtonBar";

import { Recipe } from "../../recipes/recipesApi";

import { ScheduleRepeatRecipeModalWrapper } from "./ScheduleRepeatRecipeModal.style";
import { getDaysOfTheWeekListGroupItems } from "./ScheduleRepeatRecipeModal.utils";
import { BootstrapVariantsEnum } from "../../../constants";

type Props = {
  isShown: boolean;
  targetRecipe: Recipe;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
};

const ScheduleRepeatRecipeModal = ({
  isShown,
  targetRecipe,
  handleSaveClick,
  handleCancelClick,
}: Props) => {
  return (
    <Modal show={isShown} size="lg">
      <ScheduleRepeatRecipeModalWrapper>
        <h1>{`Repeat Recipe - ${targetRecipe.name}`}</h1>
        <Alert>Which days do you want to schedule this recipe to repeat?</Alert>
        <ButtonBar
          listGroupContent={getDaysOfTheWeekListGroupItems()}
          handleSelection={() => {}}
        />
        <section className="modal-controls">
          <Stack direction="horizontal" gap={2}>
            <Button onClick={handleSaveClick}>Save</Button>
            <Button
              onClick={handleCancelClick}
              variant={BootstrapVariantsEnum.DANGER}
            >
              Cancel
            </Button>
          </Stack>
        </section>
      </ScheduleRepeatRecipeModalWrapper>
    </Modal>
  );
};

export default ScheduleRepeatRecipeModal;
