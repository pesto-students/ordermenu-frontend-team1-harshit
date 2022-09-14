import { createSlice } from '@reduxjs/toolkit'
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// create a slice 
//  Type for our state
export interface AuthState {
    isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
};

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        // Action to set the authentication status
        setAuthState(state, action) {
            state.isAuthenticated = action.payload;
        },

        // Special reducer for hydrating the state. Special case for next-redux-wrapper
        extraReducers: {
            // @ts-ignore
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.auth,
                };
            },
        },

    },
});

export const { setAuthState } = authSlice.actions;

export const selectIsAuthenticated = (state: AppState) => state.auth.isAuthenticated;

export default authSlice.reducer;