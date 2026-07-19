import { AgGridReact } from "ag-grid-react";

import { useMemo } from "react";

import type { AppGridProps, Identifiable } from "./types";

import styles from "./AppGrid.module.css";

function AppGrid<TData extends Identifiable>(props: AppGridProps<TData>) {
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    }),
    [],
  );

  return (
    <div className={styles.container}>
      <div className={`ag-theme-quartz ${styles.grid}`}>
        <AgGridReact<TData>
          rowData={props.rowData}
          columnDefs={props.columnDefs}
          defaultColDef={defaultColDef}
          animateRows
          getRowId={(params) => params.data.id}
          onGridReady={(event) => props.onGridApiReady?.(event.api)}
          onCellValueChanged={props.onCellValueChanged}
          {...props.gridOptions}
        />
      </div>
    </div>
  );
}

export default AppGrid;
