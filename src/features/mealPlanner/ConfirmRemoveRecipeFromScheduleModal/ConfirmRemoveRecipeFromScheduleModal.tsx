import React from "react";

import Alert from "react-bootstrap/Alert";

import ConfirmationModal from "../../../components/SharedComponents/ConfirmationModal";
import { BootstrapVariantsEnum } from "../../../constants";

type Props = {
  isModalShown: boolean;
  handleConfirmation: () => void;
  handleCancel: () => void;
};
const ConfirmRemoveRecipeFromScheduleModal = ({
  isModalShown,
  handleConfirmation,
  handleCancel,
}: Props) => {
  return (
    <ConfirmationModal
      isModalShown={isModalShown}
      confirmationProps={{
        confirmationButtonText: "Remove from meal plan",
        handleConfirmation,
      }}
      cancelProps={{ cancelButtonText: "Cancel", handleCancel }}
    >
      <Alert variant={BootstrapVariantsEnum.DANGER}>
        <h2>
          Are you sure you want to remove this recipe from your meal plan?
        </h2>
      </Alert>
    </ConfirmationModal>
  );
};

export default ConfirmRemoveRecipeFromScheduleModal;
