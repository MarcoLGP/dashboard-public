import Dashboard from "..";
import UserAvatarWallpaper from "../../../src/components/profile/UserAvatarWallpaper";
import UserBasicInformation from "../../../src/components/profile/UserBasicInformation";
import UserSystemInformation from "../../../src/components/profile/UserSystemInformation";
import styles from '../../../styles/Profile.module.css'
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "next/router";
import axios from "../../../src/utils/api/axios";
import { setUserProfileInfo } from "../../../redux/slices/userProfileInfo";
import ModalLoading from "../../../src/components/modals/ModalLoading";
import { getUserComments } from "../../../firebase";

export default function Profile() {

    const { userInfo } = useSelector(state => state.userInfo)
    const { autorizate } = useSelector(state => state.autorizate)
    const { userConnections } = useSelector(state => state.userConnections)
    const { userComments } = useSelector(state => state.userComments)
    const { userProfileInfo } = useSelector(state => state.userProfileInfo)
    const [totalLikes, setTotalLikes] = React.useState(0)
    const [userProfile, setUserProfile] = React.useState(false)
    const [userProfileComments, setUserProfileComments] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    const param = router.query.username

    React.useEffect(() => {

        if (autorizate) {
            setLoading(true)
            if (`${param}` !== userInfo.Username) {
                setUserProfile(true)
                axios.post('/getUserProfile/' + param, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
                    switch (res.data.code) {
                        case 200:
                            const { user } = res.data
                            if (user) {
                                setLoading(false)
                                dispatch(setUserProfileInfo(user))
                                getUserComments(user.Username)
                                    .then(comments => {
                                        comments.forEach(comment => {
                                            comment.Like.forEach(user_liked => {
                                                if (user_liked) {
                                                    setTotalLikes(totalLikes + 1)
                                                }
                                            })
                                        })
                                        setUserProfileComments(comments)
                                    })
                            } else {
                                router.push('/dashboard/home')
                            }
                            break;
                        default:
                            setLoading(false)
                            break;
                    }
                })
            } else {
                setLoading(false)
                userComments.forEach(comment => {
                    comment.Like.forEach(user_liked => {
                        if (user_liked) {
                            setTotalLikes(totalLikes + 1)
                        }
                    })

                })
                if (userProfileInfo) {
                    dispatch(setUserProfileInfo(false))
                }
            }
        }

    }, [autorizate, param])

    return (
        <Dashboard>
            {loading && <ModalLoading />}
            <UserAvatarWallpaper React={React} userProfileInfo={userProfileInfo} userInfo={userInfo} styles={styles} />
            <div className={styles.profile_informations_container}>
                <UserBasicInformation React={React} userProfileInfo={userProfileInfo} userInfo={userInfo} styles={styles} />
                <UserSystemInformation userTotalLikes={totalLikes} React={React} userProfileInfo={userProfileInfo} userComments={userProfile ? userProfileComments : userComments} userConnections={userConnections} userInfo={userInfo} styles={styles} />
            </div>
        </Dashboard>
    )

}