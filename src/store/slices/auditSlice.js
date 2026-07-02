import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockAuditLogs } from '../../mocks/dataGenerator';

const initialState = {
  items: mockAuditLogs,
  loading: false,
  error: null,
  selectedLog: null,
};

export const fetchAuditLogsAsync = createAsyncThunk(
  'audit/fetchLogs',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return mockAuditLogs;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch audit logs');
    }
  }
);

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    addAuditLog: (state, action) => {
      state.items.unshift(action.payload);
    },
    selectLog: (state, action) => {
      state.selectedLog = action.payload;
    },
    clearAuditLogs: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuditLogsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAuditLogsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addAuditLog, selectLog, clearAuditLogs } = auditSlice.actions;
export default auditSlice.reducer;
