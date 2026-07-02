import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  metrics: {
    totalSpend: 1450000,
    activeVendors: 42,
    openRisks: 8,
    complianceRate: 94,
    procurementPending: 15,
    procurementApproved: 64,
    auditScore: 98,
  },
  loading: false,
  error: null,
};

export const fetchDashboardMetrics = createAsyncThunk(
  'dashboard/fetchMetrics',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        totalSpend: 1580000,
        activeVendors: 48,
        openRisks: 7,
        complianceRate: 96,
        procurementPending: 12,
        procurementApproved: 72,
        auditScore: 99,
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load metrics');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateLocalMetrics: (state, action) => {
      if (state.metrics) {
        state.metrics = { ...state.metrics, ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { updateLocalMetrics } = dashboardSlice.actions;
export default dashboardSlice.reducer;
