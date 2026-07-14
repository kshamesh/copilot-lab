import { customerSaveOperation } from "./registrations/customers.save-operation";
import { productSaveOperation } from "./registrations/product.save-operation";
import { saveOperationRegistry } from "./SaveOperationsRegistry";

saveOperationRegistry.registerAll([
  customerSaveOperation,
  productSaveOperation,
]);
