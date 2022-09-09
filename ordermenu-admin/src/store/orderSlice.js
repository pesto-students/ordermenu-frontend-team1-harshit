import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllOrders, getOrderStats } from '../apis'

// Initial state
const initialState = {
  isLoading: true,
  orders: [],
  error: false,
  stats: {
    isLoading: true,
    stat: {},
    error: false
  }
};

export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async (partnerId) => await getAllOrders(partnerId)
)

export const fetchOrderStats = createAsyncThunk(
  'order/fetchOrderStats',
  async (partnerId) => await getOrderStats(partnerId)
)

// Actual Slice
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllOrders.pending]: (state) => {
      state.isLoading = true
    },
    [fetchAllOrders.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.orders = payload
    },
    [fetchAllOrders.rejected]: (state) => {
      state.isLoading = false
      state.orders = []
      state.error = true
    },
    [fetchOrderStats.pending]: (state) => {
      state.stats.isLoading = true
    },
    [fetchOrderStats.fulfilled]: (state, { payload }) => {
      state.stats.isLoading = false
      state.stats.stat = payload
    },
    [fetchOrderStats.rejected]: (state) => {
      state.stats.isLoading = false
      state.stats.stat = {}
      state.stats.error = true
    },
  }
});

export const selectOrder = (state) => state?.order;
export const selectStats = (state) => state?.order.stats;

export default orderSlice.reducer;