import { configureStore } from '@reduxjs/toolkit'
import modalsReducer from './slices/modals'
import userInfoReducer from './slices/userInfo'
import autorizateReducer from './slices/autorizate'
import commentsReducer from './slices/comments'
import userProfileInfo from './slices/userProfileInfo'
import usersSolicitationReducer from './slices/usersSolicitation'
import userConnectionsReducer from './slices/userConnections'
import searchUserDataReducer from './slices/searchUserData'
import userNotificationsReducer from './slices/userNotifications'
import userRegisterSocialSignReducer from './slices/userRegisterSocialSign'
import userCommentsReducer from './slices/userComments'

export const store = configureStore({
    reducer: {
        modals: modalsReducer,
        userRegisterSocialSign: userRegisterSocialSignReducer,
        userConnections: userConnectionsReducer,
        searchUserData: searchUserDataReducer,
        usersSolicitation: usersSolicitationReducer,
        userNotification: userNotificationsReducer,
        userInfo: userInfoReducer,
        userProfileInfo: userProfileInfo,
        autorizate: autorizateReducer,
        comments: commentsReducer,
        userComments: userCommentsReducer
    }
})