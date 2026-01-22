import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const getErrorMessage = (error) => {
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please check your connection.';
    }
    if (error.message === 'Network Error') {
      return 'No internet connection. Please check your network.';
    }
    return 'Unable to connect to server.';
  }

  const { status } = error.response;
  switch (status) {
    case 500:
      return 'Server error. Please try again later.';
    case 503:
      return 'Service temporarily unavailable.';
    default:
      return 'Unable to load products. Pull down to retry.';
  }
};

export const fetchProducts = createAsyncThunk('products/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/products');
    return data.data || data || [];
  } catch (error) {
    const message = getErrorMessage(error);
    return rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;
