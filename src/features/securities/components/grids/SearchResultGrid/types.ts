import type { IDatasource } from "ag-grid-community";

export interface SearchResultGridRef {
  setDatasource(datasource: IDatasource): void;

  refresh(): void;
}

export interface SearchResultGridProps {}
