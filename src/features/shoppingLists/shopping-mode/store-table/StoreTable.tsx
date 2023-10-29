import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { ItemData } from "../../shoppingListsApi";

import { SemanticWrapper } from "./StoreTable.style";
import { AisleHeading } from "../aisle-heading/AisleHeading";

type Props = {};

const defaultData: ItemData[] = [
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
  },
];

const columnHelper = createColumnHelper<ItemData>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Produce",
    footer: (info) => "",
  }),
  columnHelper.accessor("quantity", {
    cell: (info) => info.getValue(),
    header: "",
    footer: (info) => "",
  }),
  columnHelper.accessor("aisle", {
    cell: (info) => info.getValue().aisle,
    header: "",
    footer: (info) => "",
  }),
];

export const StoreTable = ({}: Props): React.ReactElement => {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

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
  return (
    <>
      <AisleHeading
        aisleName="Produce"
        iconCount={table.getRowModel().rows.length}
        isOpen={true}
        handleCaretClick={() => console.log("Caret clicked...")}
      ></AisleHeading>
      <SemanticWrapper>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </SemanticWrapper>
    </>
  );
};
