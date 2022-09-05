import { createSlice } from '@reduxjs/toolkit'
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// create a slice 
export interface CartState {
    products: any[],
    tableNumber: number
}

// Initial state
const initialState: CartState = {
    products: [],
    tableNumber: null
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

        setTableNumber(state, action) {
            state.tableNumber = action.payload
        },

        // Special reducer for hydrating the state. Special case for next-redux-wrapper
        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.cart,
                };
            },
        },

    },
});

export const { addProduct, setTableNumber } = cartSlice.actions;

export const selectProducts = (state: AppState) => state?.cart?.products;
export const selectTableNumber = (state: AppState) => state?.cart?.tableNumber;

export default cartSlice.reducer;