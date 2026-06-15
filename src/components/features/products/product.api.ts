import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "./product.types";
import { API_CONFIG } from "../../../config/apiConfig";

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.baseUrl,
    timeout: API_CONFIG.timeout,
    // Add headers if needed (e.g., authorization)
    prepareHeaders: (headers) => {
      // Example: Add auth token if available
      // const token = localStorage.getItem('authToken')
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`)
      // }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation<Product, Omit<Product, "id">>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<Product, Product>({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
