import { createSlice } from "@reduxjs/toolkit";

export const searchUserDataSlice = createSlice({
    name: 'searchUserData',
    initialState: {
        searchUserData: []
    },
    reducers: {
        setSearchUserData: (state, { payload }) => {
            state.searchUserData = payload
        },
        setAddSolicitationSearchUserData: (state, { payload }) => {
            state.searchUserData.forEach(user => {
                if (user.Username == payload.username_user) {
                    user.SolicitationsBy.unshift(payload.username)
                }
            })
        }
    }
})

export const { setSearchUserData, setAddSolicitationSearchUserData } = searchUserDataSlice.actions
export default searchUserDataSlice.reducer