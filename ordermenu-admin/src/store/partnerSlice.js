import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPartnerDetails, updatePartnerDetails } from '../apis/'

// Initial state
const initialState = {
  isLoading: true,
  partner: {},
  error: false
};

export const fetchPartner = createAsyncThunk(
  'partner/fetchPartner',
  async () => {
    const response = await getPartnerDetails()
    return response
  }
)

export const updatePartnerAction = createAsyncThunk(
  'partner/updatePartner',
  async ({ partnerId, partner }) => await updatePartnerDetails(partnerId, partner)
)

// Actual Slice
export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPartner.pending]: (state) => {
      state.isLoading = true
    },
    [fetchPartner.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.partner = payload
    },
    [fetchPartner.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.partner = {}
      state.error = payload
    },
    [updatePartnerAction.fulfilled]: (state, { payload }) => {
      state.partner = payload
    },
  }
});

export const selectPartner = (state) => state?.partner;

export default partnerSlice.reducer;