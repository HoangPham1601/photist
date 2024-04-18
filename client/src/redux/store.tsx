import { configureStore } from "@reduxjs/toolkit";
import cartItemProductSlice from "./slice/cartItem";
import openModalSlice from "./slice/modal";

const store = configureStore({
  reducer: {
    itemCart: cartItemProductSlice,
    isModal: openModalSlice,
  },
});

export default store;
