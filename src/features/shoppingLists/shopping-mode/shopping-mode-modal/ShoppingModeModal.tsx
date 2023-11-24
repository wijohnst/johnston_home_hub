import * as React from "react";

import { SemanticWrapper } from "./ShoppingModeModal.style";
import { GroceryItem, ItemData } from "../../shoppingListsApi";
import { StoreTable } from "../store-table/StoreTable";
import { Button } from "react-bootstrap";

type Props = {
  isShown: boolean;
  groceryList: GroceryItem[];
  storeName: string;
  handleDoneShoppingClick: () => void;
};

export const ShoppingModeModal = ({
  isShown,
  groceryList,
  storeName,
  handleDoneShoppingClick,
}: Props): React.ReactElement => {
  return (
    <SemanticWrapper show={isShown}>
      <div className="modal-content">
        <StoreTable storeName={storeName} groceryList={groceryList} />
        <div className="modal-controls">
          <Button variant="danger" onClick={handleDoneShoppingClick}>
            Done shopping?
          </Button>
        </div>
      </div>
    </SemanticWrapper>
  );
};
