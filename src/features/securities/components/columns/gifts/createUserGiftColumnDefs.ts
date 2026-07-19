import type { ColDef, ValueParserParams } from "ag-grid-community";

import type { Security } from "../../models/Security";

import { DeleteButtonRenderer } from "../../cellRenderers/DeleteButtonRenderer";
import { CommentsCellEditor } from "../../cellRenderers/CommentsCellEditor";

export interface UserGiftColumnContext {
  onDelete(id: Security["id"]): void;
}

export function createUserGiftColumnDefs(
  context: UserGiftColumnContext,
): ColDef<Security>[] {
  return [
    {
      field: "ticker",
      headerName: "Ticker",
    },

    {
      field: "isin",
      headerName: "ISIN",
    },
    {
      field: "giftType",
      headerName: "Gift Type",
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      editable: true,

      valueParser: (params: ValueParserParams<Security>) => {
        const value = Number(params.newValue);

        return Number.isNaN(value) ? 0 : value;
      },
    },

    {
      field: "comments",
      headerName: "Comments",

      editable: true,

      cellEditor: CommentsCellEditor,
    },

    {
      headerName: "",

      width: 110,

      sortable: false,

      filter: false,

      cellRenderer: DeleteButtonRenderer,

      cellRendererParams: {
        onDelete: context.onDelete,
      },
    },
  ];
}
