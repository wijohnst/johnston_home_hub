import * as React from "react";

import Modal from "react-bootstrap/Modal";

type Props = {
  isShown: boolean;
  handleHide: () => void;
};
const AddChoreModal = ({ isShown, handleHide }: Props): React.ReactElement => {
  return (
    <Modal show={isShown} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add A New Chore</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default AddChoreModal;
