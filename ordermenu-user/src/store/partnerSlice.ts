import { createSlice } from '@reduxjs/toolkit'
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Initial state
const initialState: any = {
    partner: {}
};

// Actual Slice
export const partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {
        setPartner(state, action) {
            state.partner = action.payload;
        },

        // Special reducer for hydrating the state. Special case for next-redux-wrapper
        extraReducers: {
            // @ts-ignore
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.partner,
                };
            },
        },

    },
});

export const { setPartner } = partnerSlice.actions;

export const selectPartner = (state: AppState) => state?.partner?.partner;

export default partnerSlice.reducer;