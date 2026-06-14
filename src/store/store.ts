import { configureStore } from "@reduxjs/toolkit";
import { customerApi } from "../api/customerApi";
import { postApi } from "../api/postApi";

export const store = configureStore({
  reducer: {
    [customerApi.reducerPath]: customerApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customerApi.middleware, postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
