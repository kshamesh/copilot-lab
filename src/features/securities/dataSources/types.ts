import type { IDatasource } from "ag-grid-community";
import type { SecuritySearchCriteria } from "../components/SearchToolbar/types";

export type SecurityDatasource = IDatasource;

export interface CreateDatasourceOptions {
  criteria: SecuritySearchCriteria;
}
