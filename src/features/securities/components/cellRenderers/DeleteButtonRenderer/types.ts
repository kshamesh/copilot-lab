import type { ICellRendererParams } from "ag-grid-community";
import type { Security } from "../../models/Security";

export interface DeleteButtonRendererParams extends ICellRendererParams<Security> {
  onDelete(id: Security["id"]): void;
}
