import authReducer, { loginStart, loginSuccess, loginFailure, logout, updateProfile, updateUserPassword } from '../store/slices/authSlice';

describe('authSlice Reducers', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
    userProfiles: {},
    passwords: {},
  };

  test('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle loginStart', () => {
    const state = authReducer({ ...initialState, error: 'some error' }, loginStart());
    expect(state.error).toBeNull();
  });

  test('should handle loginSuccess', () => {
    const mockUser = { id: 'u1', name: 'Alice Smith', email: 'employee@company.com', role: 'Employee', department: 'IT' };
    const mockToken = 'jwt-token-abc';
    const state = authReducer(initialState, loginSuccess({ user: mockUser, token: mockToken }));
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.error).toBeNull();
  });

  test('should handle loginFailure', () => {
    const errorMessage = 'Invalid credentials';
    const state = authReducer(initialState, loginFailure(errorMessage));
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBe(errorMessage);
  });

  test('should handle logout', () => {
    const mockUser = { id: 'u1', name: 'Alice Smith', email: 'employee@company.com', role: 'Employee', department: 'IT' };
    const loggedInState = {
      isAuthenticated: true,
      user: mockUser,
      token: 'token',
      error: null,
      userProfiles: {},
      passwords: {},
    };
    const state = authReducer(loggedInState, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  test('should handle updateProfile', () => {
    const mockUser = { id: 'u1', name: 'Alice Smith', email: 'employee@company.com', role: 'Employee', department: 'IT' };
    const state = authReducer(initialState, updateProfile(mockUser));
    expect(state.user).toEqual(mockUser);
    expect(state.userProfiles?.[mockUser.email]).toEqual(mockUser);
  });

  test('should handle updateUserPassword', () => {
    const email = 'employee@company.com';
    const newPassword = 'newSecretPassword';
    const state = authReducer(initialState, updateUserPassword({ email, newPassword }));
    expect(state.passwords?.[email]).toBe(newPassword);
  });
});
