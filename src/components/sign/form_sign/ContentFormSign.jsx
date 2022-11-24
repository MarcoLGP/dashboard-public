import FormSignIn from "./FormSignIn";
import React from 'react'
import FormSignUp from "./FormSignUp";
import ModalSendEmailVerification from "../../modals/ModalSendEmailVerification";
import { useSelector } from "react-redux";

export default function ContentFormSign({ styles }) {

    const [signIn, setSignIn] = React.useState(true)
    const [visibleModalSendEmailVerification, setVisibleModalSendEmailVerification] = React.useState(false)
    const { userRegisterSocialSign } = useSelector(state => state.userRegisterSocialSign)

    React.useEffect(() => {
        if (userRegisterSocialSign) setSignIn(false)
    }, [userRegisterSocialSign])

    return (
        <div className={styles.container_form}>
            {visibleModalSendEmailVerification && <ModalSendEmailVerification React={React} styles={styles} visibleModalSendEmailVerification={visibleModalSendEmailVerification} setVisibleModalSendEmailVerification={setVisibleModalSendEmailVerification} />}
            <div className={styles.title_form_sign}>
                <h1>{signIn ? 'Login' : 'Registro'}</h1>
            </div>
            {signIn ? <FormSignIn React={React} setSignIn={setSignIn} styles={styles} />
                :
                <FormSignUp userRegisterSocialSign={userRegisterSocialSign} setVisibleModalSendEmailVerification={setVisibleModalSendEmailVerification} React={React} setSignIn={setSignIn} styles={styles} />
            }
        </div>
    )

}