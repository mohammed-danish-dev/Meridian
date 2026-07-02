import { createSlice } from '@reduxjs/toolkit';
import { mockVendors } from '../../mocks/dataGenerator';

const initialState = {
  items: mockVendors,
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    addVendor: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateVendor: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteVendor: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addVendor, updateVendor, deleteVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
