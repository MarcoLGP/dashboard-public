import { Avatar, Row } from "@nextui-org/react";
import FlatList from "flatlist-react";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaUserClock, FaUsers, FaUserAlt } from "react-icons/fa"
import { MdPersonSearch } from "react-icons/md"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useSelector } from "react-redux";
import { setUserUpdateSolicitations } from "../../redux/slices/userInfo";
import { RiUserReceivedFill } from "react-icons/ri";
import axios from "../utils/api/axios";
import { createAndRemoveEvent } from "../utils/functions/db_events";
import { useRouter } from "next/router";
import { setAddSolicitationSearchUserData } from "../../redux/slices/searchUserData";
import jwt from 'jsonwebtoken'
import { encrypt } from "../../crypto";

export default function ModalListSearchUser({ styles, dispatch, React, setVisibleSearchUsersModal }) {

    const { userInfo } = useSelector(state => state.userInfo)
    const { searchUserData } = useSelector(state => state.searchUserData)
    const router = useRouter()

    function handleProfileUser(Username) {
        setVisibleSearchUsersModal(false)
        router.push(`/dashboard/profile/${Username}`)
    }

    function emptyList() {

        return (
            <div className={styles.emptyListContainer}>
                <MdPersonSearch size={40} className={styles.emptyListIcon} />
                <span className={styles.fontSearchingUser}>Pesquise por algum usuário</span>
            </div>
        )
    }

    function handleAddSolicitation(UsernameUser) {
        createAndRemoveEvent({ type: 'create', event: `new_solicitation-${UsernameUser}`, data: userInfo.Username })
        dispatch(setUserUpdateSolicitations({ type: 'add', username: UsernameUser, operation: 'by' }))
        dispatch(setAddSolicitationSearchUserData({ username_user: userInfo.Username, username: UsernameUser }))
        const req_token = encrypt(jwt.sign({ data: { username_user: userInfo.Username, username: UsernameUser, operation: 'add' } }))
        axios.post('/updateUserSolicitations/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })
    }

    function handleRemoveSolicitation(user) {
        const req_token = encrypt(jwt.sign({ data: { username_user: userInfo.Username, operation: 'remove', username: user } }))
        axios.post('/updateUserSolicitations/', + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET })
        dispatch(setUserUpdateSolicitations({ type: 'remove', username: user }))
    }

    function renderSearchUsers({ Username, Img, Localization, SolicitationsFor, SolicitationsBy, Connections }) {

        let solicitation_for
        let solicitation_by
        let friend
        let user

        if (Username.includes(userInfo.Username)) user = true

        SolicitationsFor.forEach(user => {
            if (userInfo.Username == user) {
                solicitation_for = true
            }
        })

        SolicitationsBy.forEach(user => {
            if (userInfo.Username == user) {
                solicitation_by = true
            }
        })

        Connections.forEach(user => {
            if (userInfo.Username == user) {
                friend = true
            }
        })

        return (
            <div className={styles.container_list_search_user}>
                <Row align="center" onClick={() => handleProfileUser(Username)}>
                    <Avatar size={'lg'} src={Img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} />
                    <span className={styles.font_name_user_search}>{Username}</span>
                </Row>
                <Row css={{ marginTop: 10 }} align="center" justify="space-between">
                    <Row align="center">
                        <span className={`fi fi-${Localization.country_code}`} />
                        <span className={styles.font_localization_user_search}>{Localization.state}</span>
                    </Row>
                    {solicitation_by ?
                        <FaUserClock onClick={() => handleRemoveSolicitation(Username)} color={'grey'} size={16} style={{ marginRight: 12 }} /> :
                        solicitation_for ?
                            <RiUserReceivedFill style={{ marginRight: 12 }} color="#172b4d" size={16} /> :
                            friend ?
                                <FaUsers style={{ marginRight: 12 }} color="#172b4d" size={19} /> :
                                user ?
                                    <FaUserAlt style={{ marginRight: 12 }} color="#172b4d" size={16} /> :
                                    <BsPersonPlusFill className={styles.icon_add_user_search} onClick={() => handleAddSolicitation(Username)} size={22} style={{ marginRight: 12 }} />}
                </Row>
            </div>
        )
    }

    return (
        <FlatList
            list={searchUserData}
            renderOnScroll
            renderWhenEmpty={emptyList}
            className={`${styles.list_show} custom_scrollbar`}
            wrapperHtmlTag='div'
            renderItem={renderSearchUsers}
        />
    )
}