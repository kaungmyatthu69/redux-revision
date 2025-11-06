import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from ".";

export const createAppASyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
