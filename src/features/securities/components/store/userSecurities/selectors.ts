import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../../../store/store";
import type { Security } from "../../models/Security";

export const selectUserSecurities = (state: RootState) =>
  state.userSecurities.items;

export const selectAlreadyAddedIds = createSelector(
  [selectUserSecurities],

  (securities) => new Set(securities.map((security: Security) => security.id)),
);
