import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./conterSlice";
import postReducer from "./postSlice"
export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    posts:postReducer
  },
});

//for typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;