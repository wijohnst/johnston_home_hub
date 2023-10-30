import * as React from "react";

import { Button } from "react-bootstrap";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  Row,
} from "@tanstack/react-table";
import { ItemData } from "../../shoppingListsApi";
import { LinkSpan } from "../../../../components/SharedComponents/SharedComponents";

import {
  SemanticWrapper,
  ItemName,
  ItemActions,
  ItemQuantity,
} from "./AisleTable.style";
import { AisleHeading } from "../aisle-heading/AisleHeading";
import { AisleItem } from "../aisle-item/AisleItem";
import { AisleFooter } from "../aisle-footer/AisleFooter";

import { ReactComponent as CheckIcon } from "../../../../assets/images/green_check.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/images/delete_icon.svg";
import { ReactComponent as NotVisibleIcon } from "../../../../assets/images/not_visible_icon.svg";

type Props = {
  aisleName: string;
  initialOpenState: boolean;
};

type AisleItem = ItemData & {
  isVisible: boolean;
};

let defaultData: AisleItem[] = [
  {
    _id: "1",
    name: "Apples",
    quantity: "2 EA.",
    store: {
      _id: "1",
      name: "Walmart",
      category: "Grocery",
    },
    aisle: {
      _id: "1",
      aisle: "Produce",
    },
    url: undefined,
    category: "Grocery",
    isVisible: true,
  },
  {
    _id: "2",
    name: "Bananas",
    quantity: "6 EA.",
    store: {
      _id: "1",
      name: "Walmart",
      category: "Grocery",
    },
    aisle: {
      _id: "1",
      aisle: "Produce",
    },
    url: undefined,
    category: "Grocery",
    isVisible: true,
  },
  {
    _id: "3",
    name: "Bread",
    quantity: "1 loaf",
    store: {
      _id: "1",
      name: "Walmart",
      category: "Grocery",
    },
    aisle: {
      _id: "2",
      aisle: "Bakery",
    },
    url: undefined,
    category: "Grocery",
    isVisible: true,
  },
];

export const AisleTable = ({
  aisleName = "Aisle Name",
  initialOpenState = false,
}: Props): React.ReactElement => {
  const columnHelper = createColumnHelper<AisleItem>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <ItemName>
          <span>{info.getValue()}</span>
        </ItemName>
      ),
      header: aisleName,
    }),
    columnHelper.accessor("quantity", {
      cell: (info) => (
        <ItemQuantity>
          <span>{info.getValue()}</span>
        </ItemQuantity>
      ),
      header: "",
    }),
    columnHelper.display({
      id: "aisle actions",
      cell: (cellContext) => {
        const targetItem = cellContext.row.index;
        const isHidden = !cellContext.row.original.isVisible;

        const handleClick = (type: "check" | "delete" | "unhide"): void => {
          if (type === "check") {
            const updatedData = {
              ...defaultData[targetItem],
              isVisible: false,
            };
            defaultData[targetItem] = { ...updatedData };
            setData([...defaultData]);
          }

          if (type === "delete") {
            console.log("delete");
          }

          if (type === "unhide") {
            const updatedData = {
              ...defaultData[targetItem],
              isVisible: true,
            };
            defaultData[targetItem] = { ...updatedData };
            setData([...defaultData]);
          }
        };

        return (
          <ItemActions>
            {!isHidden && (
              <>
                <CheckIcon onClick={() => handleClick("check")} role="button" />
                <DeleteIcon
                  role="button"
                  onClick={() => handleClick("delete")}
                />
              </>
            )}
            {isHidden && (
              <>
                <NotVisibleIcon
                  role="button"
                  onClick={() => handleClick("unhide")}
                />
              </>
            )}
          </ItemActions>
        );
      },
    }),
  ];

  const [data, setData] = React.useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isOpen, setIsOpen] = React.useState(initialOpenState);
  const [hiddenRowsAreShown, setHiddenRowsAreShown] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  /**
   * Accepts a rows array and returns the number of visible rows
   *
   * @param rows Row<AisleItem>[]
   * @returns number
   */
  const getIconCount = (rows: Row<AisleItem>[]): number => {
    return rows.reduce((iconCount: number, currentRow: Row<AisleItem>) => {
      if (currentRow.original.isVisible) {
        iconCount++;
      }
      return iconCount;
    }, 0);
  };

  const getHiddenRows = (rows: Row<AisleItem>[]): Row<AisleItem>[] => {
    return rows.filter((row) => !row.original.isVisible);
  };

  const hasHiddenRows = (): boolean => {
    return getHiddenRows(table.getRowModel().rows).length > 0;
  };

  const getLinkSpan = (): React.ReactElement | null => {
    if (hasHiddenRows() && !hiddenRowsAreShown) {
      return (
        <LinkSpan role="button" onClick={() => setHiddenRowsAreShown(true)}>
          Show Hidden Rows
        </LinkSpan>
      );
    }

    if (hiddenRowsAreShown === true) {
      return (
        <LinkSpan role="button" onClick={() => setHiddenRowsAreShown(false)}>
          Hide Hidden Rows
        </LinkSpan>
      );
    }

    return null;
  };

  return (
    <>
      <AisleHeading
        aisleName={aisleName}
        iconCount={getIconCount(table.getRowModel().rows)}
        isOpen={isOpen}
        handleCaretClick={() => setIsOpen(!isOpen)}
      ></AisleHeading>
      <SemanticWrapper>
        <tbody>
          {isOpen && (
            <>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    if (cell.row.original.isVisible) {
                      return (
                        <AisleItem key={cell.id} isHidden={false}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </AisleItem>
                      );
                    }
                    if (!cell.row.original.isVisible && hiddenRowsAreShown) {
                      return (
                        <AisleItem key={cell.id} isHidden={true}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </AisleItem>
                      );
                    }
                  })}
                </tr>
              ))}
            </>
          )}
        </tbody>
        <AisleFooter>
          <tr>
            <th colSpan={table.getAllColumns().length}>{getLinkSpan()}</th>
          </tr>
        </AisleFooter>
      </SemanticWrapper>
    </>
  );
};
