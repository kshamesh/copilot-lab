import { useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {} from "react-hook-form";
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

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
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
        tags: product.tags?.length > 0 ? product.tags : [{ value: "" }],
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    console.log(data);

    await onSave?.(data);
  };

  console.log("Errors", errors);

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
          <RHFTextarea<ProductFormData>
            label="Description"
            name="description"
          />
          <RHFTextField<ProductFormData>
            label="Active"
            name="active"
            type="checkbox"
          />
          <h3>Tags</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="tag-row">
              <RHFTextField<ProductFormData>
                label={`Tag ${index + 1}`}
                name={`tags.${index}.value`}
              />
              <button
                type="button"
                // disabled={fields.length === 1}
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({
                value: "",
              })
            }
          >
            Add Tag
          </button>
          {errors.tags?.root?.message && (
            <p className="error">{errors.tags.root.message}</p>
          )}
          <button type="submit" className="save-btn">
            Save Product
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;
