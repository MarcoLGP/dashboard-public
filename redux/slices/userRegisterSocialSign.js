import { createSlice } from "@reduxjs/toolkit";

export const userRegisterSocialSignSlice = createSlice({
    name: 'userRegisterSocialSign',
    initialState: {
        userRegisterSocialSign: false
    },
    reducers: {
        setUserRegisterSocialSign: (state, { payload }) => {
            state.userRegisterSocialSign = payload
        },
        clearRegisterSocialSign: (state) => {
            state.userRegisterSocialSign = false
        },
        setUsernameRegisterSocialSign: (state, { payload }) => {
            state.userRegisterSocialSign = payload
        }
    }
})

export const { setUserRegisterSocialSign, setProviderRegisterSign, clearRegisterSocialSign, setUsernameRegisterSocialSign } = userRegisterSocialSignSlice.actions
export default userRegisterSocialSignSlice.reducer