import { SaveOperationKeys } from "../SaveOperationsKeys";
import type {
  SaveContext,
  SaveOperationRegistration,
} from "../SaveOperationsTypes";

function saveCustomer(context: SaveContext): void {
  console.log("Saving customer", context.entityId);

  // prepare payload

  // invoke API
}

export const customerSaveOperation: SaveOperationRegistration = {
  key: SaveOperationKeys.CUSTOMER,
  handler: saveCustomer,
};
