import { createSlice } from "@reduxjs/toolkit";

export const userNotificationSlice = createSlice({
    name: 'userNotification',
    initialState: {
        userNotification: []
    },
    reducers: {
        setUserNotification: (state, { payload }) => {
            state.userNotification.unshift(payload)
        },
        setRemoveUserNotification: (state, { payload }) => {
            state.userNotification = state.userNotification.filter(notification => notification.idComment !== payload)
        }
    }
})

export const { setUserNotification, setRemoveUserNotification } = userNotificationSlice.actions
export default userNotificationSlice.reducer