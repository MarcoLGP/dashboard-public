import Dashboard from "..";
import LeftContent from "../../../src/components/dashboard/LeftContent";
import ModalWelcome from "../../../src/components/modals/ModalWelcome";
import styles from '../../../styles/Home.module.css'
import React from "react";
import { useSelector } from "react-redux";
import ModalAvatarPhoto from "../../../src/components/modals/ModalAvatarPhoto";
import { Row } from "@nextui-org/react";
import Comments from "../../../src/lists/Comments";

export default function DashboardHome() {

    const { userFirstAcess } = useSelector(state => state.modals)
    const [visibleModalAvatarPhoto, setVisibleModalAvatarPhoto] = React.useState(true)
    const { userInfo } = useSelector(state => state.userInfo)

    return (
        <Dashboard>
            {userFirstAcess && <ModalWelcome styles={styles} userFirstAcess={userFirstAcess} setVisibleModalAvatarPhoto={setVisibleModalAvatarPhoto} />}
            {userFirstAcess && !userInfo.Img && <ModalAvatarPhoto Username={userInfo.Username} React={React} visibleModalAvatarPhoto={visibleModalAvatarPhoto} setVisibleModalAvatarPhoto={setVisibleModalAvatarPhoto} />}
            <Row>
                <LeftContent React={React} userInfo={userInfo} styles={styles} />
                <Comments React={React} styles={styles} />
            </Row>
        </Dashboard>
    )
}