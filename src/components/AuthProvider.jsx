import axios from "../utils/api/axios"
import React from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "../../redux/slices/userInfo"
import { db_comments } from "../../firebase"
import { setAutorizate } from "../../redux/slices/autorizate"
import ModalLoading from "./modals/ModalLoading"
import { setComment } from "../../redux/slices/comments"
import { collection, onSnapshot, query } from "firebase/firestore"
import { setUsersSolicitation } from "../../redux/slices/usersSolicitation"
import { setUserNotification } from "../../redux/slices/userNotifications"
import { setUserConnections } from "../../redux/slices/userConnections"
import { setAddUserComments } from "../../redux/slices/userComments"

export default function AuthProvider({ children }) {

    const router = useRouter()
    const dispatch = useDispatch()
    const { autorizate } = useSelector(state => state.autorizate)
    const { userNotification } = useSelector(state => state.userNotification)

    async function getToken() {
        const token = localStorage.getItem('token')
        return token
    }

    function getUserProfile(username, connections) {
        axios.post(`/getUserProfile/${username}`, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
            switch (res.data.code) {
                case 200:
                    connections ? dispatch(setUserConnections(res.data.user)) : dispatch(setUsersSolicitation(res.data.user))
                    break;
            }
        })
    }

    function getUserImage(username, notification, idComment) {
        axios.post(`/getUserImage/${username}`, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
            switch (res.data.code) {
                case 200:
                    dispatch(setUserNotification({ notification: notification, img: res.data.img, idComment: idComment }))
                    break;
                default:
                    dispatch(setUserNotification({ notification: notification, img: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg', idComment: idComment }))
                    break;
            }
        })
    }

    React.useEffect(() => {

        if (!autorizate) getToken().then(token => {

            if (token) {
                axios.post(`/getUser/${token}`, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                    switch (res.data.code) {
                        case 200:
                            const { user } = res.data
                            if (user.SolicitationsFor[0]) user.SolicitationsFor.forEach(user_solicitation_for => {
                                getUserProfile(user_solicitation_for)
                            })
                            if (user.Connections[0]) user.Connections.forEach(user_connection => {
                                getUserProfile(user_connection, true)
                            })
                            if (user.Notifications[0]) user.Notifications.forEach(notification => {
                                if (userNotification[0]) {
                                    userNotification.forEach(notification_2 => {
                                        if (notification.split(';')[0].split(' ')[0].includes(notification_2.notification.split(' ')[0])) {
                                            dispatch(setUserNotification({ notification: notification.split(';')[0], img: notification_2.img, idComment: notification.split(';')[1] }))
                                        } else {
                                            getUserImage(notification.split(';')[0].split(' ')[0], notification.split(';')[0], notification.split(';')[1])
                                        }
                                    })
                                } else {
                                    getUserImage(notification.split(';')[0].split(' ')[0], notification.split(';')[0], notification.split(';')[1])
                                }
                            })

                            const q = query(collection(db_comments, 'Comments'))
                            onSnapshot(q, snapshot => {
                                snapshot.docChanges().forEach(changes => {
                                    if (changes.type === 'added') {
                                        if (changes.doc.data().Author == user.Username) {
                                            dispatch(setAddUserComments(changes.doc.data()))
                                        }
                                        axios.post(`/getUserImage/${changes.doc.data().Author}`, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                                            switch (res.data.code) {
                                                case 200:
                                                    dispatch(setComment({
                                                        idComment: changes.doc.id, ...changes.doc.data(),
                                                        imageUser: res.data.img
                                                    }))
                                                    break;
                                                default:
                                                    dispatch(setComment({
                                                        idComment: changes.doc.id, ...changes.doc.data(),
                                                        imageUser: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg'
                                                    }))
                                                    break;
                                            }
                                        })
                                    }
                                })
                            })
                            dispatch(setUserInfo(user))
                            dispatch(setAutorizate(true))
                            break;
                        default:
                            localStorage.setItem('token', false)
                            router.push('/')
                            break;
                    }
                })

            } else {
                router.push('/')
            }

        })

    }, [])

    return (
        <>
            {autorizate ?
                <>{children}</>
                :
                <ModalLoading />}
        </>
    )

}