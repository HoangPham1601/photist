import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  quantity: number;
  img: string;
  title: string;
}

const cartItemProductSlice = createSlice({
  name: "itemCart",
  initialState: [] as CartItem[],
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    updateItemCart: (
      state: CartItem[],
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      console.log("state ", state);
      const itemIndex = state.findIndex((item) => item.id === id);
      console.log(itemIndex);
      if (itemIndex !== -1 && quantity > 0) {
        // Update quantity console.log()
        console.log("vo duoc day", state[itemIndex].quantity, quantity);
        state[itemIndex].quantity = quantity;
      } else if (itemIndex !== -1 && quantity === 0) {
        // Remove item if quantity reaches 0
        state = state.filter((_, index) => index !== itemIndex);
      }
      return state;
    },
  },
});

export const { updateItemCart, addItemToCart, removeItemFromCart } =
  cartItemProductSlice.actions;
export default cartItemProductSlice.reducer;
