import FlatList from "flatlist-react"
import { Avatar, Row } from '@nextui-org/react'
import '/node_modules/flag-icons/css/flag-icons.min.css'

export default function ModalListConnections({ styles, connections }) {

    function renderConnection({ Username, Img, Localization }) {
        return (
            <div className={`${styles.container_item_list_modal_show_connections} ${styles.move_effect_list_show}`}>
                <Row align="center">
                    <Avatar src={Img} size={'lg'} />
                    <span className={styles.font_name_modal_show_connections}>{Username}</span>
                </Row>
                <Row css={{ marginTop: 10 }} align="center">
                    <span className={`fi fi-${Localization.country_code}`} style={{ marginRight: 5 }} />
                    <span className={styles.font_local_modal_connection}>{Localization.state}</span>
                </Row>
            </div>
        )
    }

    return (
        <FlatList
            list={connections}
            renderOnScroll
            className={`${styles.list_show} custom_scrollbar`}
            wrapperHtmlTag='div'
            renderItem={renderConnection}
        />
    )

}