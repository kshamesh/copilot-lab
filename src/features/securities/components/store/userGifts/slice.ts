import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Security } from "../../models/Security";

interface UserGiftsState {
  items: Security[];
}

const initialState: UserGiftsState = {
  items: [],
};

const userGiftsSlice = createSlice({
  name: "userGifts",

  initialState,

  reducers: {
    addGift(state, action: PayloadAction<Security>) {
      const exists = state.items.some((gift) => gift.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeGift(state, action: PayloadAction<string>) {
      state.items = state.items.filter((gift) => gift.id !== action.payload);
    },

    updateGift(state, action: PayloadAction<Security>) {
      const index = state.items.findIndex(
        (gift) => gift.id === action.payload.id,
      );

      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addGift, removeGift, updateGift } = userGiftsSlice.actions;

export default userGiftsSlice.reducer;
