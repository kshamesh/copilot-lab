import { useCallback, useMemo } from "react";

import AppGrid from "../AppGrid/AppGrid";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  removeSecurity,
  selectUserSecurities,
  updateSecurity,
} from "../../../store/userSecurities";
import type { CellValueChangedEvent } from "ag-grid-community";
import { createUserSecurityColumnDefs } from "../../columns/userSecurities/createUserSecurityColumnDefs";
import type { Security } from "../../models/Security";

export function UserSecuritiesGrid() {
  const securities = useAppSelector(selectUserSecurities);
  const dispatch = useAppDispatch();

  const onDelete = useCallback(
    (id: string) => {
      dispatch(removeSecurity(id));
    },

    [dispatch],
  );

  const columnDefs = useMemo(
    () => createUserSecurityColumnDefs({ onDelete }),
    [onDelete],
  );

  const onCellValueChanged = useCallback(
    (event: CellValueChangedEvent<Security>) => {
      dispatch(updateSecurity(event.data));
    },
    [dispatch],
  );

  return (
    <AppGrid
      rowData={securities}
      columnDefs={columnDefs}
      onCellValueChanged={onCellValueChanged}
    />
  );
}
