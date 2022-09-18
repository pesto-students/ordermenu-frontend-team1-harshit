import { createSlice } from '@reduxjs/toolkit'
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// create a slice 
export interface CartState {
    products: any[];
    tableId: number;
}

// Initial state
const initialState: CartState = {
    products: [],
    tableId: null
};

// Actual Slice
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(state, action) {
            state.products = [
                ...state.products,
                action.payload
            ]
        },

        setTableId(state, action) {
            state.tableId = action.payload
        },

        resetCart(state) {
            state.products = []
        },

        reloadCart(state, { payload }) {
            state.products = payload
        },
        // Special reducer for hydrating the state. Special case for next-redux-wrapper
        extraReducers: {
            // @ts-ignore
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.cart,
                };
            },
        },

    },
});

export const { addProduct, setTableId, resetCart, reloadCart } = cartSlice.actions;

export const selectProducts = (state: AppState) => state?.cart?.products;
export const selectTableId = (state: AppState) => state?.cart?.tableId;

export default cartSlice.reducer;