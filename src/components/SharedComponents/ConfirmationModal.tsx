import React from "react";

import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { ModalContentWrapper } from "./ConfirmationModal.style";

type ConfirmationProps = {
  confirmationButtonText: string;
  handleConfirmation: () => void;
};

type CancelProps = {
  cancelButtonText: string;
  handleCancel: () => void;
};

type Props = {
  children: React.ReactNode;
  isModalShown: boolean;
  confirmationProps: ConfirmationProps;
  cancelProps: CancelProps;
};
const ConfirmationModal = ({
  children,
  isModalShown,
  confirmationProps,
  cancelProps,
}: Props) => {
  return (
    <Modal show={isModalShown} onHide={cancelProps.handleCancel}>
      <ModalContentWrapper>
        <Stack>
          {children}
          <div className="modal-controls">
            <Button
              variant="danger"
              onClick={() => confirmationProps.handleConfirmation()}
            >
              {confirmationProps.confirmationButtonText}
            </Button>
            <Button
              variant="primary"
              onClick={() => cancelProps.handleCancel()}
            >
              {cancelProps.cancelButtonText}
            </Button>
          </div>
        </Stack>
      </ModalContentWrapper>
    </Modal>
  );
};

export default ConfirmationModal;
