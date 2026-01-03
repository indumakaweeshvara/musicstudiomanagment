

import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {


  token: string | null;
  isAuthenticated: boolean;
  user: { name: string, email: string } | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'), 
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string, user: { name: string, email: string } }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token); 
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token'); 
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions; 
export default authSlice.reducer;