import FlatList from "flatlist-react"
import { Avatar, Row } from "@nextui-org/react"
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "../utils/api/axios"
import { createAndRemoveEvent } from "../utils/functions/db_events"
import { setRemoveUsersSolicitation } from "../../redux/slices/usersSolicitation"
import jwt from 'jsonwebtoken'
import { encrypt } from "../../crypto"

export default function Solicitations({ styles }) {

    const { usersSolicitation } = useSelector(state => state.usersSolicitation)
    const { userInfo } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    function handleAccept(user) {
        dispatch(setRemoveUsersSolicitation(user))
        const req_token = encrypt(jwt.sign({ data: { username_user: userInfo.Username, username: user, operation: 'accept' } }, process.env.NEXT_PUBLIC_JWT_SECRET))
        axios.post('/updateUserSolicitations/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
            switch (res.data.code) {
                case 200:
                    createAndRemoveEvent({ type: 'create', event: `new_connection-${user}`, data: userInfo.Username })
                    createAndRemoveEvent({ type: 'create', event: `new_connection-${userInfo.Username}`, data: user })
                    break;
            }
        })
    }

    function handleSolicitations({ Username, Localization, Img }) {

        return (
            <div className={styles.container_item_solicitations}>
                <Row align="center">
                    <Avatar size={'lg'} src={Img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} />
                    <Row align="center">
                        <span className={styles.font_item_username_solicitation}>{Username}</span>
                        <Row justify="flex-end">
                            <AiOutlineCheck cursor={'pointer'} size={18} style={{ marginRight: 10 }} onClick={() => handleAccept(Username)} color="green" />
                            <AiOutlineClose cursor={'pointer'} size={18} color="red" />
                        </Row>
                    </Row>
                </Row>
                <Row align="center" style={{ marginTop: 10 }}>
                    <span className={`fi fi-${Localization.country_code}`} />
                    <span style={{ marginLeft: 6, fontStyle: 'italic', color: '#7a7888', fontWeight: 600 }}>{Localization.state}</span>
                </Row>
            </div>
        )
    }

    return (
        <FlatList
            list={usersSolicitation}
            className={`${styles.container_list_solicitation_notification} custom_scrollbar`}
            wrapperHtmlTag="div"
            renderOnScroll
            renderItem={handleSolicitations}
        />
    )

}