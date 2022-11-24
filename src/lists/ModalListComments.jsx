import FlatList from "flatlist-react"
import React from 'react'

export default function ModalListComments({ styles, data }) {

    function renderComments({ Content, Img }) {

        return (
            <div className={`${styles.container_item_list_show_comments} ${styles.move_effect_list_show}`}>
                <span className={styles.comment_item_list_show_comments}>{Content}</span>
                {Img && <div className={styles.img_item_list_show_comments} style={{ background: `url(${Img}) no-repeat`, backgroundSize: '100% 100%' }} />}
            </div>
        )
    }


    return (
        <FlatList
            wrapperHtmlTag='div'
            list={data}
            renderOnScroll
            className={`${styles.list_show} custom_scrollbar`}
            renderItem={renderComments}
        />
    )

}