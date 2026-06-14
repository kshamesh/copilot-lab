import { useMemo } from "react";
import type {
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "../types/customer";
import {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from "../api/customerApi";

export function useCustomers() {
  const {
    data: customers,
    isLoading,
    error: queryError,
  } = useGetCustomersQuery();
  const [createMutation, createMutationState] = useCreateCustomerMutation();
  const [updateMutation, updateMutationState] = useUpdateCustomerMutation();
  const [deleteMutation, deleteMutationState] = useDeleteCustomerMutation();

  // Determine overall loading and error state
  const loading =
    isLoading ||
    createMutationState.isLoading ||
    updateMutationState.isLoading ||
    deleteMutationState.isLoading;
  const error =
    queryError ||
    createMutationState.error ||
    updateMutationState.error ||
    deleteMutationState.error;

  // Format error message
  const errorMessage = useMemo(() => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object" && "data" in error)
      return error.data as string;
    return error ? "An error occurred" : null;
  }, [error]);

  const addCustomer = async (
    request: CreateCustomerRequest,
  ): Promise<boolean> => {
    try {
      await createMutation(request).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const updateExisting = async (
    id: string,
    request: UpdateCustomerRequest,
  ): Promise<boolean> => {
    try {
      await updateMutation({ id, request }).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const removeCustomer = async (id: string): Promise<boolean> => {
    try {
      await deleteMutation(id).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  return {
    customers,
    loading,
    error: errorMessage,
    loadCustomers: () => {}, // No-op since RTK Query handles fetching automatically
    addCustomer,
    updateExisting,
    removeCustomer,
  };
}
