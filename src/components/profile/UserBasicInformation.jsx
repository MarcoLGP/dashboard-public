import UserInformationItem from "./UserInformationItem";
import ModalEditEmail from "../modals/ModalEditEmail";
import ModalEditPassword from "../modals/ModalEditPassword";
import ModalEditUsername from "../modals/ModalEditUsername";
import { useDispatch } from 'react-redux'

export default function UserBasicInformation({ styles, userInfo, React, userProfileInfo }) {

    const [visibleModalEditUsername, setVisibleModalEditUsername] = React.useState(false)
    const [visibleModalEditEmail, setVisibleModalEditEmail] = React.useState(false)
    const [visibleModalEditPassword, setVisibleModalEditPassword] = React.useState(false)

    const dispatch = useDispatch()

    return (
        <>
            {visibleModalEditUsername && <ModalEditUsername React={React} dispatch={dispatch} Username={userInfo.Username} visibleModalEditUsername={visibleModalEditUsername} setVisibleModalEditUsername={setVisibleModalEditUsername} />}
            {visibleModalEditEmail && <ModalEditEmail React={React} Username={userInfo.Username} dispatch={dispatch} userEmail={userInfo.Email} visibleModalEditEmail={visibleModalEditEmail} setVisibleModalEditEmail={setVisibleModalEditEmail} />}
            {visibleModalEditPassword && <ModalEditPassword React={React} Username={userInfo.Username} dispatch={dispatch} userPassword={userInfo.Password} visibleModalEditPassword={visibleModalEditPassword} setVisibleModalEditPassword={setVisibleModalEditPassword} />}
            <div className={styles.user_box_basic_information_container}>
                <h1 className={styles.title_user_box_information}>Informações básicas</h1>
                <div className={styles.user_box_basic_lines}>
                    {userProfileInfo ?
                        <>
                            <UserInformationItem cursorDefault profileInfo={userProfileInfo} openModal={() => false} info={'Usuário'} value={userProfileInfo.Username} last={userProfileInfo.Username} />
                        </>
                        :
                        <>
                            <UserInformationItem openModal={() => setVisibleModalEditUsername(true)} info={'Usuário'} value={userInfo.Username} />
                            <UserInformationItem openModal={() => setVisibleModalEditEmail(true)} info={'E-mail'} value={userInfo.Email} />
                            <UserInformationItem openModal={() => setVisibleModalEditPassword(true)} info={'Senha'} value={'*************'} last />
                        </>
                    }
                </div>
            </div>
        </>

    )

}