import { createSlice } from '@reduxjs/toolkit';
import { mockRisks } from '../../mocks/dataGenerator';

const initialState = {
  items: mockRisks,
  loading: false,
  error: null,
};

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    addRisk: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateRisk: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteRisk: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addRisk, updateRisk, deleteRisk } = riskSlice.actions;
export default riskSlice.reducer;
