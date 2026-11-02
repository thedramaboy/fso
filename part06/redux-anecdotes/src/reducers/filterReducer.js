import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      console.log(current(state));
      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
