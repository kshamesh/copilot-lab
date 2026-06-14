import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "../types/customer";
import * as mockApi from "./customerApiMock";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], void>({
      async queryFn() {
        try {
          const response = await mockApi.fetchCustomers();
          if (response.success && response.data) {
            return { data: response.data };
          }
          return { error: response.error || "Failed to load customers" };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      },
      providesTags: ["Customer"],
    }),

    createCustomer: builder.mutation<Customer, CreateCustomerRequest>({
      async queryFn(request) {
        try {
          const response = await mockApi.createCustomer(request);
          if (response.success && response.data) {
            return { data: response.data };
          }
          return { error: response.error || "Failed to create customer" };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      },
      invalidatesTags: ["Customer"],
      // Optimistic update
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        const optimisticCustomer: Customer = {
          id: Date.now().toString(),
          ...request,
        };
        const patchResult = dispatch(
          customerApi.util.updateQueryData(
            "getCustomers",
            undefined,
            (draft) => {
              draft.push(optimisticCustomer);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateCustomer: builder.mutation<
      Customer,
      { id: string; request: UpdateCustomerRequest }
    >({
      async queryFn({ id, request }) {
        try {
          const response = await mockApi.updateCustomer(id, request);
          if (response.success && response.data) {
            return { data: response.data };
          }
          return { error: response.error || "Failed to update customer" };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      },
      invalidatesTags: ["Customer"],
      // Optimistic update
      async onQueryStarted({ id, request }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          customerApi.util.updateQueryData(
            "getCustomers",
            undefined,
            (draft) => {
              const customer = draft.find((c) => c.id === id);
              if (customer) {
                Object.assign(customer, request);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteCustomer: builder.mutation<void, string>({
      async queryFn(id) {
        try {
          const response = await mockApi.deleteCustomer(id);
          if (response.success) {
            return { data: undefined };
          }
          return { error: response.error || "Failed to delete customer" };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      },
      invalidatesTags: ["Customer"],
      // Optimistic update
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          customerApi.util.updateQueryData(
            "getCustomers",
            undefined,
            (draft) => {
              return draft.filter((c) => c.id !== id);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
