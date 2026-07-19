// AppGrid/types.ts

import type {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridOptions,
} from "ag-grid-community";

export interface AppGridProps<TData> {
  rowData?: TData[];

  columnDefs: ColDef<TData>[];

  gridOptions?: GridOptions<TData>;

  onGridApiReady?: (api: GridApi<TData>) => void;

  onCellValueChanged?: (event: CellValueChangedEvent<TData>) => void;
}

export interface Identifiable {
  id: string;
}

export type AppGridComponent = <TData extends Identifiable>(
  props: AppGridProps<TData>,
) => React.ReactElement;
