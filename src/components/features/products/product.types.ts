export interface Product {
  id: number;
  productName: string;
  sku: string;
  price: number;
  category: string;
  description?: string;
  active: boolean;
}
