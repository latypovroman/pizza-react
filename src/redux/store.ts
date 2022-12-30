import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzasReducer from "./slices/pizzasSlice";
import popupReducer from "./slices/popupSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    pizzasReducer,
    popupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
