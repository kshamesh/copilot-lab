import type { IDatasource, IGetRowsParams } from "ag-grid-community";
import type { SearchSecurityRequest } from "../components/SearchToolbar/types";
import type { SearchSecurityResponse } from "./types";

export function createSecuritySearchDatasource(
  criteria: SearchSecurityRequest,
): IDatasource {
  return {
    async getRows(params: IGetRowsParams) {
      const request: SearchSecurityRequest = {
        ticker: criteria.ticker,

        isin: criteria.isin,

        startRow: params.startRow,

        endRow: params.endRow,
      };

      try {
        const response = await fetch("/api/security/search", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(request),
        });

        const data: SearchSecurityResponse = await response.json();

        params.successCallback(
          data.rows,

          data.totalRows,
        );
      } catch {
        params.failCallback();
      }
    },
  };
}
