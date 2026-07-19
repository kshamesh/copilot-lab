import type { ColDef } from "ag-grid-community";
import type { Security } from "../../models/Security";
import {
  AddButtonRenderer,
  type AddSecurityContext,
} from "../../cellRenderers/AddButtonRenderer";

export function createSearchColumnDefs(
  deps: AddSecurityContext,
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
      field: "description",
      headerName: "Description",
    },

    {
      field: "market",
      headerName: "Market",
    },

    {
      headerName: "",

      width: 120,

      sortable: false,

      filter: false,

      cellRenderer: AddButtonRenderer,

      cellRendererParams: {
        onAdd: deps.onAdd,

        alreadyAddedIds: deps.alreadyAddedIds,
      },
    },
  ];
}
