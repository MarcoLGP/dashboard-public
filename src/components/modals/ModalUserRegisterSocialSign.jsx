import { Image, Modal } from "@nextui-org/react";
import { setModalUserRegisterSocialSign } from "../../../redux/slices/modals";

export default function ModalUserRegisterSocialSign({ visible, React, dispatch }) {

    setTimeout(() => {
        dispatch(setModalUserRegisterSocialSign(false))
    }, 3000)

    return (
        <Modal
            open={visible}
            onClose={() => dispatch(setModalUserRegisterSocialSign(false))}
        >
            <Modal.Body>
                <Image src={'https://www.reshot.com/preview-assets/icons/TNX35WZRD6/wrong-user-TNX35WZRD6.svg'} objectFit={'contain'} height={150} width={150} />
                <span style={{ textAlign: 'center', fontFamily: 'inter', fontWeight: 600 }}>Verificamos que ainda não possui cadastro, complete seu cadastro</span>
            </Modal.Body>
        </Modal>
    )

}