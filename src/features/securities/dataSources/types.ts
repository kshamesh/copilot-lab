import type { IDatasource } from "ag-grid-community";
import type { SearchSecurityRequest } from "../components/SearchToolbar/types";
import type { Security } from "../components/models/Security";

export type SecurityDatasource = IDatasource;

export interface CreateDatasourceOptions {
  criteria: SearchSecurityRequest;
}

export interface SearchSecurityResponse {
  rows: Security[];

  totalRows: number;
}
