import { useCallback, useMemo } from "react";

import type { CellValueChangedEvent } from "ag-grid-community";

import AppGrid from "../AppGrid/AppGrid";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

import type { Security } from "../../models/Security";

import {
  removeGift,
  selectUserGifts,
  updateGift,
} from "../../../store/userGifts";
import { createUserGiftColumnDefs } from "../../columns/gifts";

export function UserGiftsGrid() {
  const dispatch = useAppDispatch();

  const gifts = useAppSelector(selectUserGifts);

  const onDelete = useCallback(
    (id: string) => {
      dispatch(removeGift(id));
    },
    [dispatch],
  );

  const onCellValueChanged = useCallback(
    (event: CellValueChangedEvent<Security>) => {
      dispatch(updateGift(event.data));
    },
    [dispatch],
  );

  const columnDefs = useMemo(
    () =>
      createUserGiftColumnDefs({
        onDelete,
      }),
    [onDelete],
  );

  return (
    <AppGrid<Security>
      rowData={gifts}
      columnDefs={columnDefs}
      onCellValueChanged={onCellValueChanged}
    />
  );
}
