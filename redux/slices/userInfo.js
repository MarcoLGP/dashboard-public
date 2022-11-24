import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        userInfo: ''
    },
    reducers: {
        setUserInfo: (state, { payload }) => {
            state.userInfo = payload
        },
        setUserUpdatePhoto: (state, { payload }) => {
            state.userInfo.Img = payload
        },
        setUserUpdateUsername: (state, { payload }) => {
            state.userInfo.Username = payload
        },
        setUserUpdateEmail: (state, { payload }) => {
            state.userInfo.Email = payload
        },
        setUserUpdateConnections: (state, { payload }) => {
            if (payload.type == 'add') {
                state.userInfo.Connections.unshift(payload.username)
            } else if (payload.type == 'remove') {
                state.userInfo.Connections = state.userInfo.Connections.filter(user => user.Username !== payload.username)
            }
        },
        setUserUpdateSolicitations: (state, { payload }) => {
            if (payload.operation == 'by') {
                if (payload.type == 'add') {
                    state.userInfo.SolicitationsBy.unshift(payload.username)
                } else if (payload.type == 'remove') {
                    state.userInfo.SolicitationsBy = state.userInfo.SolicitationsBy.filter(user => user !== payload.username)
                }
            }
        }
    }
})

export const { setUserInfo, setUserUpdateSolicitations, setUserUpdateConnections, setUserUpdateEmail, setUserUpdatePhoto, setUserUpdateUsername } = userInfoSlice.actions
export default userInfoSlice.reducer