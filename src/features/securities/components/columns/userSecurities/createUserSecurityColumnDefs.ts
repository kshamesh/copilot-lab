import type { ColDef } from "ag-grid-community";
import type { Security } from "../../models/Security";

import { DeleteButtonRenderer } from "../../cellRenderers/DeleteButtonRenderer";
import { CommentsCellEditor } from "../../cellRenderers/CommentsCellEditor";

export interface UserSecurityColumnContext {
  onDelete(id: Security["id"]): void;
}
export function createUserSecurityColumnDefs(
  context: UserSecurityColumnContext,
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
      field: "market",
      headerName: "Market",
    },

    {
      field: "quantity",

      editable: true,

      valueParser: (params) => {
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

      width: 120,

      sortable: false,

      filter: false,

      cellRenderer: DeleteButtonRenderer,

      cellRendererParams: {
        onDelete: context.onDelete,
      },

      cellEditorParams: {
        maxLength: 250,

        placeholder: "Enter comments",
      },
    },
  ];
}
