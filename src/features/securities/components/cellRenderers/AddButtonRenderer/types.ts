import type { ICellRendererParams } from "ag-grid-community";
import type { Security } from "../../models/Security";

export interface AddButtonRendererParams
  extends ICellRendererParams<Security>, AddSecurityContext {}

export interface AddSecurityContext {
  onAdd(security: Security): void;

  alreadyAddedIds: ReadonlySet<Security["id"]>;
}
