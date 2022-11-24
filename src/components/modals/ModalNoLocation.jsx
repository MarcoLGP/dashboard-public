import { Button, Card, Modal } from "@nextui-org/react";

export default function ModalNoLocation({ styles, visibleModalNoLocation, setVisibleModalNoLocation }) {

    return (
        <Modal
            open={visibleModalNoLocation}
            width={420}
            onClose={() => setVisibleModalNoLocation(false)}
        >
            <Modal.Header>
                <h1>Geolocalização</h1>
            </Modal.Header>
            <Modal.Body>
                <span className={styles.font_body_modal_confirm_geolocation}>Para efetuar o cadastro precisamos que aceite a permissão de localização.</span>
                <span className={styles.font_body_modal_confirm_geolocation}><span style={{ color: 'red' }}>Caso tenha bloqueado a permissão e depois permitido</span>, aperte em registrar novamente.</span>
            </Modal.Body>
            <Modal.Footer>
                <Card>
                    <Button onClick={() => setVisibleModalNoLocation(false)}>Ok</Button>
                </Card>
            </Modal.Footer>
        </Modal>
    )

}