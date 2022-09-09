import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from './partnerSlice'
import categoryReducer from './categorySlice'
import productReducer from './productSlice'
import tableReducer from './tableSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    partner: partnerReducer,
    category: categoryReducer,
    product: productReducer,
    table: tableReducer,
    order: orderReducer
  },
  devTools: true,
});
