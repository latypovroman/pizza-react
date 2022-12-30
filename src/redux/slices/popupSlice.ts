import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  isOpened: false,
  item: {
    id: "",
    imageUrl: "",
    title: "",
    price: 0,
    count: 0,
    type: "",
    size: 0,
  },
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopupData: (state, action) => {
      state.item = action.payload;
    },
    openPopup: (state) => {
      state.isOpened = true;
    },
    closePopup: (state) => {
      state.isOpened = false;
    },
  },
});

export const selectPopup = (state: RootState) => state.popupReducer;

export const { setPopupData, openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
