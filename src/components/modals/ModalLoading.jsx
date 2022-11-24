import { Loading, Modal, Row } from "@nextui-org/react";

export default function ModalLoading() {

    return (
        <Modal
            open={true}
            width={100}
            blur
        >
            <Modal.Footer>
                <Row justify="center">
                    <Loading />
                </Row>
            </Modal.Footer>
        </Modal>
    )

}