import styled from "styled-components";
import { Modal } from "react-bootstrap";

export const SemanticWrapper = styled(Modal)`
  .modal-content {
    padding: 1rem;
  }

  .modal-controls {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    margin: 1rem 0 0 0;
  }
`;
