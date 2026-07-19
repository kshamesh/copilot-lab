import type { IDatasource, IGetRowsParams } from "ag-grid-community";

import { mockSecurities } from "./mockSecurities";

import type { CreateDatasourceOptions } from "./types";

export function createSecuritySearchDatasource(
  options: CreateDatasourceOptions,
): IDatasource {
  return {
    getRows(params: IGetRowsParams) {
      const { startRow, endRow } = params;

      let rows = mockSecurities;

      const { ticker, isin } = options.criteria;

      if (ticker) {
        rows = rows.filter((security) =>
          security.ticker.toLowerCase().includes(ticker.toLowerCase()),
        );
      }

      if (isin) {
        rows = rows.filter((security) =>
          security.isin.toLowerCase().includes(isin.toLowerCase()),
        );
      }

      const page = rows.slice(startRow, endRow);

      params.successCallback(page, rows.length);
    },
  };
}
