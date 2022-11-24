import { Avatar, Loading, Row } from "@nextui-org/react"
import FlatList from "flatlist-react"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function ConnectionsUser({ styles }) {

    const { userConnections } = useSelector(state => state.userConnections)
    const router = useRouter()

    function handleData({ Username, Img, Localization }) {

        return (
            <div onClick={() => router.push(`/dashboard/profile/${Username}`)} className={`${styles.item_list_container} move_effect`}>
                <div className={styles.avatar_name_all_users}>
                    <Avatar size={'lg'} src={Img || "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} />
                    <span className={styles.font_name_avatar_conections}>{Username}</span>
                </div>
                <Row align="center" className={styles.footer_item_list}>
                    <span className={`fi fi-${Localization.country_code}`} />
                    <span className={styles.item_state_connection_user}>{Localization.state}</span>
                </Row>
            </div>
        )
    }

    return (
        userConnections ?
            <FlatList
                list={userConnections}
                renderWhenEmpty={() => <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>Sem conexões</span>
                        <Loading style={{ margin: 25 }} type="points" />
                    </div>
                </div>}
                wrapperHtmlTag="div"
                className={`${styles.list_container_connections_user} custom_scrollbar`}
                renderItem={handleData}
                renderOnScroll
            /> :
            <Loading style={{ margin: 25 }} type="points" />
    )

}