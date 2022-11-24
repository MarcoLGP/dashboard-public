import { Loading, Modal, Row } from "@nextui-org/react";

export default function ModalVerifyLogin() {

    return (
        <Modal
            open={true}
            blur
        >
            <Modal.Header>
                <h1>Verificando login</h1>
            </Modal.Header>
            <Modal.Footer>
                <Row justify="center">
                    <Loading />
                </Row>
            </Modal.Footer>
        </Modal>
    )

}