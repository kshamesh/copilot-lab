import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { WorkflowForm } from "./workflow.types";

export function createWorkflowForm<T extends FieldValues>(
  methods: Pick<
    UseFormReturn<T>,
    "trigger" | "getValues" | "reset" | "formState"
  >,
): WorkflowForm<T> {
  return {
    trigger: methods.trigger,

    getValues: () => methods.getValues(),

    reset: methods.reset,

    getState: () => ({
      isValid: methods.formState.isValid,
      isDirty: methods.formState.isDirty,
      errors: methods.formState.errors,
    }),
  };
}
