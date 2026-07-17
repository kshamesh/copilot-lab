import type { FieldValues } from "react-hook-form";
import type { WorkflowForm } from "./workflow.types";

export class WorkflowRegistry {
  private forms = new Map<string, WorkflowForm>();

  register<T extends FieldValues>(id: string, form: WorkflowForm<T>) {
    if (this.forms.has(id)) {
      console.warn(
        `[WorkflowRegistry] Form '${id}' is already registered. Overwriting existing registration.`,
      );
    }

    this.forms.set(id, form);
  }

  unregister(id: string) {
    this.forms.delete(id);
  }

  get(id: string) {
    return this.forms.get(id);
  }

  require(id: string) {
    const form = this.get(id);

    if (!form) {
      throw new Error(
        [
          `[WorkflowRegistry] Form '${id}' is not registered.`,
          "",
          "Possible reasons:",
          "- The form has not mounted yet.",
          "- The form forgot to call useWorkflowForm().",
          "- The form has already unmounted.",
          "- The form id is incorrect.",
        ].join("\n"),
      );
    }

    return form;
  }

  has(id: string) {
    return this.forms.has(id);
  }

  getAll() {
    return [...this.forms.entries()];
  }

  clear() {
    this.forms.clear();
  }
}

export const workflowRegistry = new WorkflowRegistry();
