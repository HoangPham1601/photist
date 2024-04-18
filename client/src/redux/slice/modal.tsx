import { createSlice } from "@reduxjs/toolkit";

interface IsModal {
  isOpen: boolean;
}
const initialState: IsModal = {
  isOpen: false,
};

const openModalSlice = createSlice({
  name: "isModal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleModal, closeModal } = openModalSlice.actions;
export default openModalSlice.reducer;
