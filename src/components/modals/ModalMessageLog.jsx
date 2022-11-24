import { Modal } from "@nextui-org/react";
import Image from "next/image";
import { setModalMessageLog } from "../../../redux/slices/modals";

export default function ModalMessageLog({ msg, React, visible, dispatch }) {

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(setModalMessageLog({ visible: false }))
        }, 3000)
    }, [])

    return (
        <Modal
            open={visible}
            onClose={() => dispatch(setModalMessageLog({ visible: false }))}
            width={240}
        >
            <Modal.Body>
                <Image src={'https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/red-alert-icon.png'} objectFit={'contain'} height={70} width={70} />
                <span style={{ textAlign: 'center', marginTop: 15, fontWeight: 700, fontFamily: 'Inter' }}>{msg}</span>
            </Modal.Body>
        </Modal>
    )

}