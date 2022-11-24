import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
    name: 'modals',
    initialState: {
        userFirstAcess: false,
        modalMessageLog: { visible: false, msg: 'Link inválido' },
        modalUserRegisterSocialSign: false
    },
    reducers: {
        setUserFirstAcess: (state, { payload }) => {
            state.userFirstAcess = payload
        },
        setModalMessageLog: (state, { payload }) => {
            state.modalMessageLog = payload
        },
        setModalUserRegisterSocialSign: (state, {payload}) => {
            state.modalUserRegisterSocialSign = payload
        }
    }
})

export const { setUserFirstAcess, setModalMessageLog, setModalUserRegisterSocialSign } = modalsSlice.actions
export default modalsSlice.reducer