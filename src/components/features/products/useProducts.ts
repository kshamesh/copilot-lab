import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./product.api";

export const useProducts = () => {
  const productsQuery = useGetProductsQuery();

  const [createProduct] = useCreateProductMutation();

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    error: productsQuery.error,

    createProduct,
    updateProduct,
    deleteProduct,
  };
};
