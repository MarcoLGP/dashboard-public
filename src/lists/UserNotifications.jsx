import { Avatar, Row } from "@nextui-org/react";
import { AiOutlineCheck } from 'react-icons/ai'
import FlatList from "flatlist-react";
import axios from "../utils/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setRemoveUserNotification } from "../../redux/slices/userNotifications";
import jwt from 'jsonwebtoken'
import { encrypt } from '../../crypto'

export default function UserNotifications({ notifications, styles }) {

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userInfo)

    function removeNotification(notification) {
        const req_token = encrypt(jwt.sign({ data: { username_user: userInfo.Username, operation: 'remove', notification: notification } }, process.env.NEXT_PUBLIC_JWT_SECRET))
        axios.post('/updateUserNotifications/' + req_token, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(() => {
            dispatch(setRemoveUserNotification(notification.split(';')[1]))
        })
    }

    function handleNotification({ notification, img, idComment }) {

        return (
            <Row align="center">
                <Row align="center" className={styles.item_notifications}>
                    <Avatar src={img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} />
                    <span className={styles.font_item_notification}>{notification}</span>
                </Row>
                <AiOutlineCheck onClick={() => removeNotification(`${notification};${idComment}`)} className={styles.icon_check_item_notification} size={23} />
            </Row>

        )
    }

    return (
        <FlatList
            list={notifications}
            className={`${styles.container_list_solicitation_notification} custom_scrollbar`}
            wrapperHtmlTag="div"
            renderOnScroll
            renderItem={handleNotification}
        />
    )

}