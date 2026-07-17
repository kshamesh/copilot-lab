import { useEffect } from "react";
import type { FieldValues } from "react-hook-form";

import type { WorkflowForm } from "./workflow.types";
import { workflowRegistry } from "./workflowRegistry";

interface UseWorkflowFormOptions<T extends FieldValues> {
  id: string;
  form: WorkflowForm<T>;
}

export function useWorkflowForm<T extends FieldValues>({
  id,
  form,
}: UseWorkflowFormOptions<T>) {
  useEffect(() => {
    workflowRegistry.register(id, form);

    return () => workflowRegistry.unregister(id);
  }, [id, form]);
}
