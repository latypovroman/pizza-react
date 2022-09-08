import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  activeFilter: 0,
  currentPage: 1,
  activeSort: {
    name: "популярности",
    property: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDeeplinkFilter: (state, action) => {
      state.activeFilter = Number(action.payload.activeFilter);
      state.activeSort = action.payload.activeSort;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const {
  setSearchValue,
  setActiveFilter,
  setActiveSort,
  setCurrentPage,
  setDeeplinkFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
