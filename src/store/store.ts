import { configureStore } from "@reduxjs/toolkit";
import { customerApi } from "../api/customerApi";
import { postApi } from "../api/postApi";
import { productApi } from "../components/features/products/product.api";

export const store = configureStore({
  reducer: {
    [customerApi.reducerPath]: customerApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      customerApi.middleware,
      postApi.middleware,
      productApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
