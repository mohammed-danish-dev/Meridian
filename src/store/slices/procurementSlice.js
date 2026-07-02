import { createSlice } from '@reduxjs/toolkit';
import { mockProcurements } from '../../mocks/dataGenerator';

const initialState = {
  items: mockProcurements,
  loading: false,
  error: null,
};

const procurementSlice = createSlice({
  name: 'procurement',
  initialState,
  reducers: {
    addRequest: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateRequest: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteRequest: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateStatus: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.status = action.payload.status;
        item.updatedAt = new Date().toISOString();
      }
    }
  },
});

export const { addRequest, updateRequest, deleteRequest, updateStatus } = procurementSlice.actions;
export default procurementSlice.reducer;
