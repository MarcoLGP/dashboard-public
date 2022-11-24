import { createSlice } from "@reduxjs/toolkit";

export const usersSolicitationSlice = createSlice({
    name: 'usersSolicitation',
    initialState: {
        usersSolicitation: [],
        usersSolicitationModal: false
    },
    reducers: {
        setUsersSolicitation: (state, { payload }) => {
            state.usersSolicitation.unshift(payload)
        },
        setRemoveUsersSolicitation: (state, { payload }) => {
            state.usersSolicitation = state.usersSolicitation.filter(user => user.Username !== payload)
        },
        setUsersSolicitationModal: (state, {payload}) => {
            state.usersSolicitationModal = payload
        }
    }
})

export const { setUsersSolicitation, setRemoveUsersSolicitation, setUsersSolicitationModal } = usersSolicitationSlice.actions
export default usersSolicitationSlice.reducer