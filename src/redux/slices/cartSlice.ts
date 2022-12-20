import { createSlice } from "@reduxjs/toolkit";
import recountTotals from "../../utils/recountTotals";

type CartItem = {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  totalCount: number;
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
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

      state.totalPrice = recountTotals(state.items).price;
      state.totalCount = recountTotals(state.items).count;
    },
    decrementItem: (state, action) => {
      const duplicateItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );

      if (duplicateItem.count > 1) {
        duplicateItem.count -= 1;
      } else {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      }

      state.totalPrice = recountTotals(state.items).price;
      state.totalCount = recountTotals(state.items).count;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      state.totalPrice = recountTotals(state.items).price;
      state.totalCount = recountTotals(state.items).count;
    },
    clearItems: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cartReducer;
export const selectCartItemById = (id: string) => (state) => {
  if (state.cartReducer.items) {
    return state.cartReducer.items.find((obj) => obj.id === id);
  } else {
    return 0;
  }
};

export const { addItem, decrementItem, clearItems, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
