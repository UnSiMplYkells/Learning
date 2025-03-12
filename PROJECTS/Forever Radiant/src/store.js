import { configureStore, createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    checkedItems: []
  },
  reducers: {
    addCheckedItem: (state, action) => {
      state.checkedItems.push(action.payload)
    },
    removeCheckedItem: (state, action) => {
      state.checkedItems = state.checkedItems.filter(id => id !== action.payload)
    },
    checkAllItems: (state, action) => {
      state.checkedItems = action.payload
    },
    clearCheckedItems: (state) => {
      state.checkedItems = []
    },
    updateTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
  }
})

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  },
})

export const { addCheckedItem, removeCheckedItem, checkAllItems, clearCheckedItems,  updateTotalAmount  } = cartSlice.actions;
export default store