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
    openPopup: (state, action) => {
      state.isOpened = true;
    },
    closePopup: (state, action) => {
      state.isOpened = false;
    },
  },
});

export const { setPopupData, openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
