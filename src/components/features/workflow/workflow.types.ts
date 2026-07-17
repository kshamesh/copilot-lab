import type { FieldErrors, FieldValues } from "react-hook-form";

export interface WorkflowFormState {
  isValid: boolean;
  isDirty: boolean;
  errors: FieldErrors;
}

export interface WorkflowForm<T extends FieldValues = FieldValues> {
  trigger: () => Promise<boolean>;

  getValues: () => T;

  reset: () => void;

  getState: () => WorkflowFormState;
}
