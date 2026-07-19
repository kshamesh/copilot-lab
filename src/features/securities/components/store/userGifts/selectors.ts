import type { RootState } from "../../../../../store/store";

export const selectUserGifts = (state: RootState) => state.userGifts.items;
