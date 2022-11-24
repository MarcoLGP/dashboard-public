import styles from "../styles/Sign.module.css"
import React from "react";
import SocialSign from "../src/layout/sign/SocialSign";
import FormSign from "../src/layout/sign/FormSign";
import ModalMessageLog from "../src/components/modals/ModalMessageLog";
import { useSelector, useDispatch } from "react-redux";
import ModalUserRegisterSocialSign from "../src/components/modals/ModalUserRegisterSocialSign";

export default function Home() {

  const { modalMessageLog, modalUserRegisterSocialSign } = useSelector(state => state.modals)
  const dispatch = useDispatch()

  return (
    <div className={styles.layoutHome}>
      {modalMessageLog.visible && <ModalMessageLog dispatch={dispatch} visible={modalMessageLog.visible} React={React} msg={modalMessageLog.msg} />}
      {modalUserRegisterSocialSign && <ModalUserRegisterSocialSign styles={styles} dispatch={dispatch} visible={modalUserRegisterSocialSign} React={React} />}
      <SocialSign styles={styles} />
      <FormSign styles={styles} />
    </div>
  )
}