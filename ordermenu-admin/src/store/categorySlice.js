import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addCategory, getAllCategories, updateCategory } from '../apis'

// Initial state
const initialState = {
  isLoading: true,
  categories: [],
  error: false
};

export const fetchAllCategories = createAsyncThunk(
  'category/fetchAllCategories',
  async () => await getAllCategories()
)

export const addCategoryAction = createAsyncThunk(
  'category/addCategory',
  async (category) => await addCategory(category)
)

export const updateCategoryAction = createAsyncThunk(
  'category/updateCategory',
  async ({ categoryId, category }) => await updateCategory(categoryId, category)
)

// Actual Slice
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllCategories.pending]: (state) => {
      state.isLoading = true
    },
    [fetchAllCategories.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.categories = payload
    },
    [fetchAllCategories.rejected]: (state) => {
      state.isLoading = false
      state.categories = []
      state.error = true
    },
    [addCategoryAction.fulfilled]: (state, { payload }) => {
      state.categories = [payload, ...state.categories]
    },
    [updateCategoryAction.fulfilled]: (state, { payload }) => {
      const index = state.categories.findIndex(c => c._id === payload._id)
      state.categories[index] = payload
    },
  }
});

export const selectCategory = (state) => state?.category;

export default categorySlice.reducer;