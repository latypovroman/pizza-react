import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../assets/api";
import { selectFilterSlice } from "./filterSlice";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchByIdStatus",
  async (params) => {
    const response = await api.getPizzas(params);
    return response.data;
  }
);

const initialState = {
  pizzas: [],
  status: "",
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.pizzas = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = "success";
      state.pizzas = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.pizzas = [];
    },
  },
});

export const selectPizzasSlice = (state) => state.pizzasReducer;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
