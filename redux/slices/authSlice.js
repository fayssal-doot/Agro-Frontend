import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'agrotrade_token';

const getErrorMessage = (error) => {
  // Handle network errors
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please check your internet connection.';
    }
    if (error.message === 'Network Error') {
      return 'Network Error - Unable to connect to server';
    }
    return 'Connection error. Please try again.';
  }

  // Handle HTTP errors
  const { status, data } = error.response;

  switch (status) {
    case 401:
      return data?.message || 'Invalid email or password';
    case 403:
      if (data?.message?.includes('pending')) {
        return 'Account pending approval';
      }
      if (data?.message?.includes('rejected') || data?.message?.includes('blocked')) {
        return 'Account blocked or rejected';
      }
      return data?.message || 'Access denied';
    case 422:
      if (data?.errors) {
        const firstError = Object.values(data.errors)[0];
        return Array.isArray(firstError) ? firstError[0] : firstError;
      }
      return data?.message || 'Invalid credentials';
    case 429:
      return '429 - Too many attempts';
    case 500:
      return '500 - Server error';
    default:
      return data?.message || 'Login failed';
  }
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    const token = data?.token;
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    return rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    // ignore network error on logout
  } finally {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/user/profile');
    return data;
  } catch (error) {
    const message = getErrorMessage(error);
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unable to login';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
