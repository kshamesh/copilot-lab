import { ModuleRegistry } from "ag-grid-community";

import { ClientSideRowModelModule } from "ag-grid-community";

import { InfiniteRowModelModule } from "ag-grid-community";

import { ValidationModule } from "ag-grid-community";

import { PaginationModule } from "ag-grid-community";

import { TextFilterModule } from "ag-grid-community";
import { NumberFilterModule } from "ag-grid-community";
import { BigIntFilterModule } from "ag-grid-community";
import { DateFilterModule } from "ag-grid-community";
import { CustomFilterModule } from "ag-grid-community";
import { TextEditorModule } from "ag-grid-community";
import { CustomEditorModule } from "ag-grid-community";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  InfiniteRowModelModule,
  ValidationModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  BigIntFilterModule,
  DateFilterModule,
  CustomFilterModule,
  TextEditorModule,
  CustomEditorModule,
]);
