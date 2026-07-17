import { SaveOperationKeys } from "../SaveOperationsKeys";
import type {
  SaveContext,
  SaveOperationRegistration,
} from "../SaveOperationsTypes";

import { workflowRegistry } from "../../workflow/workflowRegistry";
import { WorkflowFormIds } from "../../workflow/workflow-form-ids";

async function saveProduct(context: SaveContext): Promise<void> {
  console.log("Saving product", context.entityId);

  const productForm = workflowRegistry.require(WorkflowFormIds.Product);

  const valid = await productForm.trigger();
  console.log("errors", productForm?.getState().errors);

  if (!valid) {
    return;
  }

  const data = productForm.getValues();

  console.log("saveProduct data", data);
}

export const productSaveOperation: SaveOperationRegistration = {
  key: SaveOperationKeys.PRODUCT,
  handler: saveProduct,
};
