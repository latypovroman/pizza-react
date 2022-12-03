import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
  item: {},
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

export const selectPopup = (state) => state.popupReducer;

export const { setPopupData, openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
