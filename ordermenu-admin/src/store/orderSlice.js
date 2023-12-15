import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllOrders, getOrderStats, updateOrderStatus } from '../apis'

// Initial state
const initialState = {
  isLoading: true,
  orders: {
    results: [],
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0
  },
  error: false,
  stats: {
    isLoading: true,
    stat: {},
    error: false
  },
  newOrders: []
};

export const fetchAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async ({ partnerId, sortBy, limit, page, status }) => await getAllOrders(partnerId, sortBy, limit, page, status)
)

export const fetchOrderStats = createAsyncThunk(
  'order/fetchOrderStats',
  async (partnerId) => await getOrderStats(partnerId)
)

export const updateOrderStatusAction = createAsyncThunk(
  'order/updateOrderStatusAction',
  async ({ orderId, status }) => await updateOrderStatus(orderId, status)
)

// Actual Slice
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addNewOrder: (state, { payload }) => {
      state.newOrders.unshift(payload)
    }
  },
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
    [updateOrderStatusAction.fulfilled]: (state, { payload }) => {
      const index = state.orders.results.findIndex((order) => order?._id === payload._id)
      state.orders.results[index] = payload
    },
  }
});

export const selectOrder = (state) => state?.order;
export const selectNewOrders = (state) => state?.order.newOrders;
export const selectStats = (state) => state?.order.stats;

export const { addNewOrder } = orderSlice.actions;
export default orderSlice.reducer;