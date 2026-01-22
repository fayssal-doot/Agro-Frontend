import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchOrders = createAsyncThunk('orders/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/orders');
    return data.data || [];
  } catch (error) {
    return rejectWithValue('Unable to load orders');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;
