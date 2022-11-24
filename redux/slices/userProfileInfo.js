import { createSlice } from "@reduxjs/toolkit";

export const userProfileInfoSlice = createSlice({
    name: 'userProfileInfo',
    initialState: {
        userProfileInfo: ''
    },
    reducers: {
        setUserProfileInfo: (state, { payload }) => {
            state.userProfileInfo = payload
        }
    }
})

export const { setUserProfileInfo } = userProfileInfoSlice.actions
export default userProfileInfoSlice.reducer