import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import recountCounters from "../../utils/recountCounters";
import { RootState } from "../store";
import getStoredCart from "../../utils/getStoredCart";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  totalCount: number;
}

const initialState: CartSliceState = {
  totalPrice: getStoredCart().totalPrice,
  items: getStoredCart().items,
  totalCount: getStoredCart().totalCount,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const duplicateItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );

      if (duplicateItem) {
        duplicateItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      recountCounters(state);
    },
    decrementItem: (state, action: PayloadAction<CartItem>) => {
      const duplicateItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );

      if (duplicateItem && duplicateItem.count > 1) {
        duplicateItem.count -= 1;
      } else {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      }

      recountCounters(state);
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      recountCounters(state);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartReducer;
export const selectCartItemById = (item: CartItem) => (state: RootState) => {
  console.log(state.cartReducer.items);
  if (state.cartReducer.items) {
    return state.cartReducer.items.find((obj) => obj.id === item.id);
  } else {
    return 0;
  }
};

export const { addItem, decrementItem, clearItems, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
