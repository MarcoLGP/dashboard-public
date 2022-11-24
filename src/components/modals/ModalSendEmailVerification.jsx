import { Modal } from "@nextui-org/react";
import Image from "next/image";

export default function ModalSendEmailVerification({ styles, React, visibleModalSendEmailVerification, setVisibleModalSendEmailVerification }) {

    React.useEffect(() => {
        setTimeout(() => {
            setVisibleModalSendEmailVerification(false)
        }, 3000)
    }, [])

    return (
        <Modal
            open={visibleModalSendEmailVerification}
            style={{ height: 235 }}
            onClose={() => setVisibleModalSendEmailVerification(false)}
        >
            <Modal.Body>
                <Image src={'https://www.reshot.com/preview-assets/icons/C4XDB2TAEM/email-C4XDB2TAEM.svg'} height={140} width={140} objectFit={'contain'} />
                <span className={styles.modal_message_log_font_body}>Enviamos um link para o seu e-mail para ativar a sua conta</span>
            </Modal.Body>
        </Modal>
    )

}