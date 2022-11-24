import { createSlice } from "@reduxjs/toolkit";

export const autorizateSlice = createSlice({
    name: 'autorizate',
    initialState: {
        autorizate: false
    },
    reducers: {
        setAutorizate: (state, {payload}) => {
            state.autorizate = payload
        }
    }
})

export const { setAutorizate } = autorizateSlice.actions
export default autorizateSlice.reducer