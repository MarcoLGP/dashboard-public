import { createSlice } from "@reduxjs/toolkit";

export const userGeolocationSlice = createSlice({
    name: 'userGeolocation',
    initialState: {
        userGeolocation: ''
    },
    reducers: {
        setUserGeolocation: (state, {payload}) => {
            state.userGeolocation = payload
        }
    }
})

export const { setUserGeolocation } = userGeolocationSlice.actions
export default userGeolocationSlice.reducer