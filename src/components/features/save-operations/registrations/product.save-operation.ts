import { SaveOperationKeys } from "../SaveOperationsKeys";
import type {
  SaveContext,
  SaveOperationRegistration,
} from "../SaveOperationsTypes";

function saveProduct(context: SaveContext): void {
  console.log("Saving product", context.entityId);
}

export const productSaveOperation: SaveOperationRegistration = {
  key: SaveOperationKeys.PRODUCT,
  handler: saveProduct,
};
