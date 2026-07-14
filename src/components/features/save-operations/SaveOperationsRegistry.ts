import type { SaveOperationKey } from "./SaveOperationsKeys";
import type {
  SaveContext,
  SaveOperationHandler,
  SaveOperationRegistration,
} from "./SaveOperationsTypes";

export class SaveOperationRegistry {
  private readonly handlers = new Map<SaveOperationKey, SaveOperationHandler>();

  register(registration: SaveOperationRegistration): void {
    const { key, handler } = registration;

    if (this.handlers.has(key)) {
      throw new Error(`Save operation already registered for key '${key}'.`);
    }

    this.handlers.set(key, handler);
  }

  registerAll(registrations: SaveOperationRegistration[]): void {
    registrations.forEach((registration) => this.register(registration));
  }

  clearAllRegistrations(): void {
    this.handlers.clear();
  }

  run(key: SaveOperationKey, context: SaveContext): void {
    const handler = this.handlers.get(key);

    if (!handler) {
      throw new Error(`No save operation registered for key '${key}'.`);
    }

    handler(context);
  }

  has(key: SaveOperationKey): boolean {
    return this.handlers.has(key);
  }

  keys(): SaveOperationKey[] {
    return [...this.handlers.keys()];
  }
}

export const saveOperationRegistry = new SaveOperationRegistry();
