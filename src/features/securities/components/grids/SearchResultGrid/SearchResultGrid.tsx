import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  useRef,
} from "react";

import type { GridOptions, GridApi, IDatasource } from "ag-grid-community";

import type { SearchResultGridRef, SearchResultGridProps } from "./types";
import type { Security } from "../../models/Security";
import AppGrid from "../AppGrid/AppGrid";

import { selectAlreadyAddedIds } from "../../../store/userSecurities/selectors";
import { addSecurity } from "../../../store/userSecurities/slice";
import { createSearchColumnDefs } from "../../columns/search/createSearchColumnDefs";
import { useAppDispatch } from "../../../../../store/hooks";
import { useAppSelector } from "../../../../../store/hooks";

export const SearchResultGrid = forwardRef<
  SearchResultGridRef,
  SearchResultGridProps
>((_props, ref) => {
  const dispatch = useAppDispatch();
  const alreadyAddedIds = useAppSelector(selectAlreadyAddedIds);
  const gridApiRef = useRef<GridApi<Security> | null>(null);

  const onAdd = useCallback(
    (security: Security) => {
      dispatch(addSecurity(security));
    },

    [dispatch],
  );

  const columnDefs = useMemo(
    () =>
      createSearchColumnDefs({
        onAdd,

        alreadyAddedIds,
      }),

    [onAdd, alreadyAddedIds],
  );

  const gridOptions = useMemo<GridOptions<Security>>(
    () => ({
      rowModelType: "infinite",

      cacheBlockSize: 10,

      pagination: true,

      paginationPageSize: 20,
    }),
    [],
  );

  const imperativeApi = useMemo(
    () => ({
      setDatasource(datasource: IDatasource) {
        gridApiRef.current?.setGridOption("datasource", datasource);
      },

      refresh() {
        gridApiRef.current?.refreshInfiniteCache();
      },
    }),
    [],
  );

  useImperativeHandle(ref, () => imperativeApi);

  return (
    <AppGrid<Security>
      columnDefs={columnDefs}
      gridOptions={gridOptions}
      onGridApiReady={(api: GridApi<Security>) => {
        gridApiRef.current = api;
      }}
    />
  );
});
