import { createSlice } from '@reduxjs/toolkit';
import { mockUsers } from '../../mocks/dataGenerator';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  userProfiles: {},
  passwords: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    updateProfile: (state, action) => {
      if (!state.userProfiles) {
        state.userProfiles = {};
      }
      state.userProfiles[action.payload.email] = action.payload;
      state.user = action.payload;
    },
    updateUserPassword: (state, action) => {
      if (!state.passwords) {
        state.passwords = {};
      }
      state.passwords[action.payload.email] = action.payload.newPassword;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile, updateUserPassword } = authSlice.actions;
export default authSlice.reducer;

export const mockLogin = (email, password) => async (dispatch, getState) => {
  dispatch(loginStart());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const state = getState();
      const customPasswords = state.auth.passwords || {};
      const expectedPassword = customPasswords[email] || 'password123';

      const user = mockUsers.find(u => u.email === email);
      if (user && password === expectedPassword) {
        const token = `mock-jwt-token-${user.id}-${Date.now()}`;
        const customProfiles = state.auth.userProfiles || {};
        const profile = customProfiles[email] || user;
        dispatch(loginSuccess({ user: profile, token }));
        resolve(profile);
      } else {
        dispatch(loginFailure('Invalid credentials. Use role emails or the updated password.'));
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};
