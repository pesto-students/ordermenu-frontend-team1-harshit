import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addTable, getAllTables, deleteTable } from '../apis'

// Initial state
const initialState = {
  isLoading: true,
  tables: [],
  error: false
};

export const fetchAllTables = createAsyncThunk(
  'table/fetchAllTables',
  async () => await getAllTables()
)

export const addTableAction = createAsyncThunk(
  'table/addTable',
  async (table) => {
    return await addTable(table)
  }
)


export const deleteTableAction = createAsyncThunk(
  'table/deleteTable',
  async (tableId) => await deleteTable(tableId)
)

// Actual Slice
export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllTables.pending]: (state) => {
      state.isLoading = true
    },
    [fetchAllTables.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.tables = payload
    },
    [fetchAllTables.rejected]: (state) => {
      state.isLoading = false
      state.tables = []
      state.error = true
    },
    [addTableAction.fulfilled]: (state, { payload }) => {
      state.tables = [payload, ...state.tables]
    },
    [deleteTableAction.fulfilled]: (state, { payload }) => {
      const index = state.tables.findIndex(c => c._id === payload)
      state.tables.splice(index, 1)
    },
  }
});

export const selectTable = (state) => state?.table;

export default tableSlice.reducer;