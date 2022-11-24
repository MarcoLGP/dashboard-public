import styles from '../../../styles/Profile.module.css'
import { BsPencil } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'


export default function UserInformationItem({ info, value, systemInfo, last, openModal, profileInfo, cursorDefault }) {

    return (
        <div className={`${styles.user_information_item} ${last && styles.user_information_item_last}`}>
            <span className={styles.font_user_item_info}>{info}</span>
            <span style={{ cursor: cursorDefault && 'default' }} onClick={openModal} className={styles.font_user_item_value}>{value}</span>
            <div style={{ cursor: cursorDefault && 'default' }} onClick={openModal} className='move_effect'>
                {!profileInfo ? systemInfo ? <AiOutlineEye size={20} /> : <BsPencil size={16} /> : null}
            </div>
        </div>

    )

}