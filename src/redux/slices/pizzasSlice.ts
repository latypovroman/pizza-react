import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../assets/api";
import { RootState } from "../store";

export type SortType = {
  name: "популярности" | "цене" | "алфавиту";
  property: "rating" | "price" | "title";
};

type FetchPizzasParams = {
  activeFilter: number;
  activeSort: SortType;
  searchValue: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchByIdStatus",
  async (params: FetchPizzasParams) => {
    const response = await api.getPizzas(params);
    return response.data;
  }
);

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface pizzasSliceState {
  pizzas: Pizza[];
  status: Status | "";
}

const initialState: pizzasSliceState = {
  pizzas: [],
  status: "",
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.pizzas = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
});

export const selectPizzasSlice = (state: RootState) => state.pizzasReducer;

// export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
