import { useGetProductQuery, useUpdateProductMutation } from "./product.api";

export const useProduct = (productId: number) => {
  const { data: product, isLoading, error } = useGetProductQuery(productId);

  const [updateProduct, { isLoading: isSaving }] = useUpdateProductMutation();

  const saveProduct = async (updatedProduct: any) => {
    return updateProduct(updatedProduct).unwrap();
  };

  return {
    product,
    isLoading,
    error,
    saveProduct,
    isSaving,
  };
};
