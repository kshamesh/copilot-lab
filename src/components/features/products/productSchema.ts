import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),

  sku: z.string().min(2, "SKU is required"),

  price: z.coerce.number().positive("Price must be greater than 0"),

  category: z.string().min(1, "Category is required"),

  description: z.string().optional(),

  active: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;
