export const SaveOperationKeys = {
  CUSTOMER: "customer",
  PRODUCT: "product",
  ORDER: "order",
} as const;

export type SaveOperationKey =
  (typeof SaveOperationKeys)[keyof typeof SaveOperationKeys];
