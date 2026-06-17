import ProductForm from "./ProductForm";
import { useProduct } from "./useProduct";

const PRODUCT_ID = 3;

export default function ProductPage() {
  const { product, isLoading, saveProduct } = useProduct(PRODUCT_ID);
  console.log("ProductPage", product);

  const handleSave = async (data: any) => {
    if (!product) return;

    await saveProduct({
      id: product.id,
      ...data,
    });

    alert("Saved Successfully");
  };

  if (isLoading) {
    return <h3>Loading Product...</h3>;
  }

  return <ProductForm product={product} onSave={handleSave} />;
}
