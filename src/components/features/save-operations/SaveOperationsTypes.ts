import type { SaveOperationKey } from "./SaveOperationsKeys";

export interface SaveContext {
  entityId: string;
  // just a place holder at the moment, but we can add more properties here as needed in the future
}

export type SaveOperationHandler = (context: SaveContext) => void;

export interface SaveOperationRegistration {
  key: SaveOperationKey;
  handler: SaveOperationHandler;
}
