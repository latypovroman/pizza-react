import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilter: 0,
  activeSort: {
    name: "популярности",
    property: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
  },
});

export const { setActiveFilter, setActiveSort } = filterSlice.actions;

export default filterSlice.reducer;
