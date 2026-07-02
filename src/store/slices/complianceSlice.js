import { createSlice } from '@reduxjs/toolkit';
import { mockCompliance } from '../../mocks/dataGenerator';

const initialState = {
  items: mockCompliance,
  loading: false,
  error: null,
};

const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    addCompliance: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateCompliance: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCompliance: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addCompliance, updateCompliance, deleteCompliance } = complianceSlice.actions;
export default complianceSlice.reducer;
