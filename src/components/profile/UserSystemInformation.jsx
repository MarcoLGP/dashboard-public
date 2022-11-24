import UserBasicInformationItem from "./UserInformationItem";
import ModalShowConnections from "../modals/ModalShowConnections";
import ModalShowComments from "../modals/ModalShowComments";

export default function UserSystemInformation({ styles, userTotalLikes, React, userInfo, userProfileInfo, userConnections, userComments }) {

    const [visibleModalShowConnection, setVisibleModalShowConnection] = React.useState(false)
    const [visibleModalShowComments, setVisibleModalShowComments] = React.useState(false)

    return (
        <>
            {visibleModalShowConnection && <ModalShowConnections userConnections={userConnections} styles={styles} React={React} visibleModalShowConnection={visibleModalShowConnection} setVisibleModalShowConnection={setVisibleModalShowConnection} />}
            {visibleModalShowComments && <ModalShowComments styles={styles} data={userComments} React={React} visibleModalShowComments={visibleModalShowComments} setVisibleModalShowComments={setVisibleModalShowComments} />}
            <div className={styles.user_box_basic_information_container}>
                <h1 className={`${styles.title_user_box_information} flex_row_reverse`}>Informações na comunidade</h1>
                <div className={styles.user_box_basic_lines}>
                    {userProfileInfo ?
                        <>
                            <UserBasicInformationItem profileInfo={userProfileInfo} openModal={() => null} cursorDefault info={'Conexões'} systemInfo value={userProfileInfo.Connections.length} />
                            <UserBasicInformationItem profileInfo={userProfileInfo} openModal={() => userComments[0] && setVisibleModalShowComments(true)} cur info={'Comentários'} systemInfo value={userComments.length} />
                            <UserBasicInformationItem profileInfo={userProfileInfo} info={'Curtidas'} systemInfo value={userTotalLikes} last />
                        </>
                        :
                        <>
                            <UserBasicInformationItem profileInfo={userInfo} openModal={() => userConnections[0] && setVisibleModalShowConnection(true)} info={'Conexões'} systemInfo value={userConnections.length} />
                            <UserBasicInformationItem profileInfo={userInfo} openModal={() => userComments[0] && setVisibleModalShowComments(true)} info={'Comentários'} systemInfo value={userComments.length} />
                            <UserBasicInformationItem profileInfo={userInfo} info={'Curtidas'} systemInfo value={userTotalLikes} last />
                        </>
                    }
                </div>
            </div>
        </>

    )

}