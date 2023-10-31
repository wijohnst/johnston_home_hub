import * as React from "react";

import { SemanticWrapper } from "./ShoppingModeModal.style";
import { ItemData } from "../../shoppingListsApi";
import { StoreTable } from "../store-table/StoreTable";
import { Button } from "react-bootstrap";

type Props = {
  isShown: boolean;
  storeItemData: ItemData[];
  storeName: string;
  handleDoneShoppingClick: () => void;
};

export const ShoppingModeModal = ({
  isShown,
  storeItemData,
  storeName,
  handleDoneShoppingClick,
}: Props): React.ReactElement => {
  return (
    <SemanticWrapper show={isShown}>
      <div className="modal-content">
        <StoreTable storeName={storeName} itemData={storeItemData} />
        <div className="modal-controls">
          <Button variant="danger" onClick={handleDoneShoppingClick}>
            Done shopping?
          </Button>
        </div>
      </div>
    </SemanticWrapper>
  );
};
