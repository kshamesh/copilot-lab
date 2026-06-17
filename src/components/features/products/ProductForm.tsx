import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./ProductForm.css";

import { productSchema, type ProductFormData } from "./productSchema";
import type { Product } from "./product.types";
import { RHFTextField } from "../../../shared/forms/RHFTextField";
import { RHFNumberField } from "../../../shared/forms/RHFNumberField";
import { RHFTextarea } from "../../../shared/forms/RHFTextArea";
import { RHFSelect } from "../../../shared/forms/RHFSelect";

interface ProductFormProps {
  product?: Product;
  onSave?: (data: ProductFormData) => Promise<void>;
}

const ProductForm = ({ product, onSave }: ProductFormProps) => {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const { handleSubmit, reset, watch } = methods;

  console.log(watch());
  const price = watch("price");

  useEffect(() => {
    if (product) {
      reset({
        productName: product.productName,
        sku: product.sku,
        price: product.price,
        category: product.category,
        description: product.description ?? "",
        active: product.active,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    console.log(data);

    await onSave?.(data);
  };

  return (
    <div className="product-container">
      <h2>Product Management</h2>

      <FormProvider {...methods}>
        <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField<ProductFormData>
            label="Product Name"
            name="productName"
          />

          <RHFTextField<ProductFormData> label="SKU" name="sku" />

          <div>
            <RHFNumberField<ProductFormData> label="Price" name="price" />
            {price > 1000 && (
              <div className="premium-banner">⭐ Premium Product</div>
            )}
          </div>

          <div className="form-group">
            <RHFSelect<ProductFormData>
              label="Category"
              name="category"
              options={[
                { label: "Electronics", value: "Electronics" },
                { label: "Clothing", value: "Clothing" },
                { label: "Books", value: "Books" },
              ]}
            />
          </div>

          {/* <div className="form-group">
            <label>Description</label>

            <textarea rows={4} {...register("description")} />
          </div> */}

          <RHFTextarea<ProductFormData>
            label="Description"
            name="description"
          />

          {/* <div className="checkbox-group">
            <input type="checkbox" id="active" {...register("active")} />

            <label htmlFor="active">Active Product</label>
          </div> */}
          <RHFTextField<ProductFormData>
            label="Active"
            name="active"
            type="checkbox"
          />

          <button
            type="submit"
            className="save-btn"
            onClick={handleSubmit(onSubmit)}
          >
            Save Product
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;
