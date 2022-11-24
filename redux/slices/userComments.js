import { createSlice } from "@reduxjs/toolkit";

export const userCommentsSlice = createSlice({
    name: 'userComments',
    initialState: {
        userComments: [],
        totalLikesUser: 0
    },
    reducers: {
        setAddUserComments: (state, { payload }) => {
            state.userComments.unshift(payload)
        },
        setAddTotalLikesUser: (state) => {
            state.totalLikesUser = state.totalLikesUser + 1
        }
    }
})

export const { setAddUserComments, setAddTotalLikesUser} = userCommentsSlice.actions
export default userCommentsSlice.reducer