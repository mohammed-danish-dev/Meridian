import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: 'light',
  sidebarOpen: true,
  globalSearchTerm: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.themeMode = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setGlobalSearch: (state, action) => {
      state.globalSearchTerm = action.payload;
    }
  },
});

export const { toggleTheme, setTheme, toggleSidebar, setSidebarOpen, setGlobalSearch } = uiSlice.actions;
export default uiSlice.reducer;
