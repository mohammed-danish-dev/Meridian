import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 'rep-001', title: 'Q2 Procurement Expenditures Summary', type: 'Procurement', format: 'PDF', status: 'Completed', generatedBy: 'manager@company.com', createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), fileSize: '1.2 MB', recordCount: 100 },
    { id: 'rep-002', title: 'Enterprise Vendor Risk Audit', type: 'Vendor', format: 'Excel', status: 'Completed', generatedBy: 'compliance@company.com', createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), fileSize: '420 KB', recordCount: 50 },
    { id: 'rep-003', title: 'ISO 27001 Missing Certifications Tracker', type: 'Compliance', format: 'CSV', status: 'Completed', generatedBy: 'auditor@company.com', createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), fileSize: '85 KB', recordCount: 20 },
  ],
  loading: false,
  error: null,
};

export const generateReportAsync = createAsyncThunk(
  'report/generateReport',
  async (reportData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newReport = {
        id: `rep-${Math.floor(Math.random() * 900) + 100}`,
        ...reportData,
        status: 'Completed',
        createdAt: new Date().toISOString(),
        fileSize: `${(Math.random() * 2 + 0.1).toFixed(1)} MB`,
      };
      return newReport;
    } catch (err) {
      return rejectWithValue(err.message || 'Report generation failed');
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    addReport: (state, action) => {
      state.items.unshift(action.payload);
    },
    deleteReport: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateReportAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateReportAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(generateReportAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addReport, deleteReport } = reportSlice.actions;
export default reportSlice.reducer;
