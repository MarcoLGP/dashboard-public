import { createSlice } from "@reduxjs/toolkit";

export const userConnectionsSlice = createSlice({
    name: 'userConnections',
    initialState: {
        userConnections: []
    },
    reducers: {
        setUserConnections: (state, { payload }) => {
            state.userConnections.unshift(payload)
        }
    }
})

export const { setUserConnections } = userConnectionsSlice.actions
export default userConnectionsSlice.reducer