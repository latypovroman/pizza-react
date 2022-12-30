import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SortType } from "./pizzasSlice";

interface FilterSliceState {
  searchValue: string;
  activeFilter: number;
  currentPage: number;
  activeSort: SortType;
}

interface ParamsState {
  searchValue?: string;
  activeFilter?: string;
  currentPage?: string;
  activeSort: SortType;
}

const initialState: FilterSliceState = {
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
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<number>) => {
      state.activeFilter = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<SortType>) => {
      state.activeSort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setDeeplinkFilter: (state, action: PayloadAction<ParamsState>) => {
      state.activeFilter = Number(action.payload.activeFilter);
      state.activeSort = action.payload.activeSort;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectFilterSlice = (state: RootState) => state.filterReducer;
export const selectActiveSort = (state: RootState) =>
  state.filterReducer.activeSort;
export const selectSearchValue = (state: RootState) =>
  state.filterReducer.searchValue;

export const {
  setSearchValue,
  setActiveFilter,
  setActiveSort,
  setCurrentPage,
  setDeeplinkFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
