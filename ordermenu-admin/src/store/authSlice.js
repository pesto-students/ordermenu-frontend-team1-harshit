import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserDetails } from '../apis';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: {}
};

export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async () => await getUserDetails()
)

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, { payload }) {
      state.isAuthenticated = payload
    }
  },
  extraReducers: {
    [fetchUserDetails.pending]: (state) => {
      state.isLoading = true
    },
    [fetchUserDetails.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
    },
    [fetchUserDetails.rejected]: (state) => {
      state.isLoading = false
      state.user = {}
      state.error = true
    },
  }
});

export const { setIsAuthenticated } = authSlice.actions

export const selectIsAuthenticated = (state) => state?.auth?.isAuthenticated;
export const selectUser = (state) => state?.auth?.user;

export default authSlice.reducer;