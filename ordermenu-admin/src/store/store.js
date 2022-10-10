import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from './partnerSlice'
import categoryReducer from './categorySlice'
import productReducer from './productSlice'
import tableReducer from './tableSlice'
import orderReducer from './orderSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    partner: partnerReducer,
    category: categoryReducer,
    product: productReducer,
    table: tableReducer,
    order: orderReducer
  },
  devTools: true,
});
