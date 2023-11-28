import { createSlice } from "@reduxjs/toolkit";

export const routerSlice = createSlice({
    name: 'routerSlice',
    initialState: {
        router: {}
    },
    reducers: {
        addRouter: (state, action) => {
            state.router = action.payload;
        }
    }
})

export const {addRouter} = routerSlice.actions;
export default routerSlice.reducer