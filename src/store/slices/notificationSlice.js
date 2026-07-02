import { createSlice } from '@reduxjs/toolkit';
import { mockNotifications } from '../../mocks/dataGenerator';

const initialState = {
  items: mockNotifications,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.items.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(n => { n.read = true; });
    },
    addNotification: (state, action) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
