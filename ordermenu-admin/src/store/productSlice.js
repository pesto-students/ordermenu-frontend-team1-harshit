import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addProduct, getAllProducts, updateProduct, deleteProduct } from '../apis'

// Initial state
const initialState = {
  isLoading: true,
  products: [],
  error: false
};

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async () => await getAllProducts()
)

export const addProductAction = createAsyncThunk(
  'product/addProduct',
  async (product) => {
    return await addProduct(product)
  }
)

export const updateProductAction = createAsyncThunk(
  'product/updateProduct',
  async ({ productId, product }) => await updateProduct(productId, product)
)

export const deleteProductAction = createAsyncThunk(
  'product/deleteProduct',
  async (productId) => await deleteProduct(productId)
)

// Actual Slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllProducts.pending]: (state) => {
      state.isLoading = true
    },
    [fetchAllProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.products = payload
    },
    [fetchAllProducts.rejected]: (state) => {
      state.isLoading = false
      state.products = []
      state.error = true
    },
    [addProductAction.fulfilled]: (state, { payload }) => {
      state.products = [payload, ...state.products]
    },
    [updateProductAction.fulfilled]: (state, { payload }) => {
      const index = state.products.findIndex(c => c._id === payload._id)
      state.products[index] = payload
    },
    [deleteProductAction.fulfilled]: (state, { payload }) => {
      const index = state.products.findIndex(c => c._id === payload)
      state.products.splice(index, 1)
    },
  }
});

export const selectProduct = (state) => state?.product;

export default productSlice.reducer;