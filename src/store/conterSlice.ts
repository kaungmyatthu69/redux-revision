import { createSlice } from "@reduxjs/toolkit";
interface User {
  id: number;
  name: string;
  age: number;
}
interface CounterState {
  value: number;
  users: User[];
}
const initialState: CounterState = {
  value: 0,
  //just for testing
  users: [
    { id: 1, name: "Jhon", age: 20 },
    { id: 2, name: "tes", age: 17 },
    { id: 3, name: "James", age: 25 },
  ],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
  selectors: {
    adultUserLength: (state) => state.users.filter((user) => user.age >= 18).length,
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { adultUserLength } = counterSlice.selectors;
export default counterSlice.reducer;
