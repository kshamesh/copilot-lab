import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Security } from "../../components/models/Security";

interface UserSecuritiesState {
  items: Security[];
}

const initialState: UserSecuritiesState = {
  items: [],
};

const userSecuritiesSlice = createSlice({
  name: "userSecurities",

  initialState,

  reducers: {
    addSecurity(state, action: PayloadAction<Security>) {
      const exists = state.items.some((s) => s.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeSecurity(state, action: PayloadAction<string>) {
      state.items = state.items.filter((s) => s.id !== action.payload);
    },

    updateSecurity(state, action: PayloadAction<Security>) {
      const index = state.items.findIndex(
        (security) => security.id === action.payload.id,
      );

      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addSecurity, removeSecurity, updateSecurity } =
  userSecuritiesSlice.actions;

export default userSecuritiesSlice.reducer;
