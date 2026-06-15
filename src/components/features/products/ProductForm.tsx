import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./ProductForm.css";

import { productSchema, type ProductFormData } from "./productSchema";
import type { Product } from "./product.types";
import CategorySelect from "./CategorySelect";

interface ProductFormProps {
  product?: Product;
  onSave?: (data: ProductFormData) => Promise<void>;
}

const ProductForm = ({ product, onSave }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      sku: "",
      price: 0,
      category: "",
      description: "",
      active: true,
    },
  });

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

      <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Product Name</label>

          <input type="text" {...register("productName")} />

          {errors.productName && (
            <span className="error">{errors.productName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>SKU</label>

          <input type="text" {...register("sku")} />

          {errors.sku && <span className="error">{errors.sku.message}</span>}
        </div>

        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            step="0.01"
            {...register("price", {
              valueAsNumber: true,
            })}
          />

          {errors.price && (
            <span className="error">{errors.price.message}</span>
          )}
          {price > 1000 && (
            <div className="premium-banner">⭐ Premium Product</div>
          )}
        </div>

        <div className="form-group">
          {/* <label>Category</label>

          <select {...register("category")}>
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Furniture">Furniture</option>
            <option value="Sports">Sports</option>
          </select> */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              console.log(field);
              return (
                <CategorySelect value={field.value} onChange={field.onChange} />
              );
            }}
          />

          {errors.category && (
            <span className="error">{errors.category.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea rows={4} {...register("description")} />
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="active" {...register("active")} />

          <label htmlFor="active">Active Product</label>
        </div>

        <button type="submit" className="save-btn">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
