import { Loading, Row, Avatar } from "@nextui-org/react"
import ConnectionsUser from "../../lists/ConnectionsUser"
import axios from '../../utils/api/axios'
import { db_notification } from "../../../firebase"
import { onValue, ref } from "firebase/database"
import { useDispatch, useSelector } from "react-redux"
import { setUserUpdateSolicitations } from "../../../redux/slices/userInfo"
import { createAndRemoveEvent } from "../../utils/functions/db_events"
import ModalSolicitations from "../modals/ModalSolicitations"
import { setUsersSolicitation, setUsersSolicitationModal } from "../../../redux/slices/usersSolicitation"
import { setUserNotification } from "../../../redux/slices/userNotifications"
import ModalNotifications from "../modals/ModalNotifications"
import { setUserConnections } from "../../../redux/slices/userConnections"

export default function FirstLineContent({ styles, userInfo, React }) {

    const [visibleModalNotifications, setVisibleModalNotifications] = React.useState(false)
    const { usersSolicitation, usersSolicitationModal } = useSelector(state => state.usersSolicitation)
    const { userNotification } = useSelector(state => state.userNotification)
    const dispatch = useDispatch()

    function getUserProfile(user, connections) {
        axios.post('/getUserProfile/' + user, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
            switch (res.data.code) {
                case 200:
                    connections ? dispatch(setUserConnections(res.data.user)) : dispatch(setUsersSolicitation(res.data.user))
                    break;
            }
        })
    }

    function getUserImage(user, notification, idComment) {
        axios.post('/getUserImage/' + user, { key: process.env.NEXT_PUBLIC_CRYPTO_SECRET }).then(res => {
            switch (res.data.code) {
                case 200:
                    dispatch(setUserNotification({ notification: notification, img: res.data.img, idComment: idComment }))
                    break;
            }
        })
    }

    React.useEffect(() => {

        const newSolicitationRef = ref(db_notification, `new_solicitation-${userInfo.Username}`)
        onValue(newSolicitationRef, snapshot => {
            if (snapshot.val()) {
                getUserProfile(snapshot.val().data)
                createAndRemoveEvent({ type: 'remove', event: `new_solicitation-${userInfo.Username}` })
            }
        })

        const newNotificationRef = ref(db_notification, `new_notification-${userInfo.Username}`)
        onValue(newNotificationRef, snapshot => {
            if (snapshot.val()) {
                if (userNotification.length > 0) {
                    userNotification.forEach(notification => {
                        if (notification.notification.split(' ')[0].includes(snapshot.val().data.split(';')[0].split(' ')[0])) {
                            dispatch(setUserNotification({ notification: snapshot.val().data.split(';')[0], img: notification.img, idComment: snapshot.val().data.split(';')[1] }))
                        } else {
                            getUserImage(snapshot.val().data.split(';')[0].split(' ')[0], snapshot.val().data.split(';')[0], snapshot.val().data.split(';')[1])
                        }
                    })
                } else {
                    getUserImage(snapshot.val().data.split(';')[0].split(' ')[0], snapshot.val().data.split(';')[0], snapshot.val().data.split(';')[1])
                }
                createAndRemoveEvent({ type: 'remove', event: `new_notification-${userInfo.Username}` })
            }
        })

        const newConnectionRef = ref(db_notification, `new_connection-${userInfo.Username}`)
        onValue(newConnectionRef, snapshot => {
            if (snapshot.val()) {
                getUserProfile(snapshot.val().data, true)
                createAndRemoveEvent({ type: 'remove', event: `new_connection-${userInfo.Username}` })
            }
        })

        const removeSolicitationByRef = ref(db_notification, `remove_solicitation_by-${userInfo.Username}`)
        onValue(removeSolicitationByRef, snapshot => {
            snapshot.val() && dispatch(setUserUpdateSolicitations({ operation: 'by', type: 'remove', username: snapshot.val().data }))
        })

    }, [false])

    return (
        <div>
            {usersSolicitation[0] && usersSolicitationModal && <ModalSolicitations dispatch={dispatch} usersSolicitationModal={usersSolicitationModal} styles={styles} />}
            {userNotification[0] && <ModalNotifications notifications={userNotification} styles={styles} visibleModalNotifications={visibleModalNotifications} setVisibleModalNotifications={setVisibleModalNotifications} />}
            <div className={styles.first_line_module} style={{ marginLeft: 0, cursor: `${usersSolicitation[0] && 'pointer'}` }} onClick={() => usersSolicitation[0] && dispatch(setUsersSolicitationModal(true))} >
                <Row align="center" justify="space-evenly">
                    {usersSolicitation[0] ?
                        <>
                            <div className={styles.avatar_name_solicitation_for}>
                                <Avatar src={usersSolicitation[0].Img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} />
                                <span className={styles.font_name_solicitation_for}>{usersSolicitation[0].Username}</span>
                            </div>
                            <div className={styles.solicitations_for_length_indicator}>
                                <span style={{ marginTop: 2 }}>{usersSolicitation.length}</span>
                            </div>
                        </>
                        : <>
                            <span>Solicitações de conexão</span>
                            <Loading type="points" />
                        </>
                    }

                </Row>
            </div>
            <div onClick={() => userNotification[0] && setVisibleModalNotifications(true)} style={{ cursor: userNotification[0] && 'pointer' }} className={`${styles.first_line_module}`}>
                {userNotification[0] ?
                    <Row align="center" justify="space-evenly">
                        <Avatar src={userNotification[0].img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} />
                        <span>{userNotification[0].notification}</span>
                        <div className={styles.solicitations_for_length_indicator}>
                            <span style={{ marginTop: 2 }}>{userNotification.length}</span>
                        </div>
                    </Row> :
                    <Row align="center" justify="space-evenly">
                        <span>Notificações</span>
                        <Loading type="points" />
                    </Row>
                }
            </div>
            <div className={styles.connections_module} style={{ marginLeft: 0 }}>
                <h1>Conexões</h1>
                <ConnectionsUser styles={styles} connections={userInfo.Connections} />
            </div>
        </div>

    )

}