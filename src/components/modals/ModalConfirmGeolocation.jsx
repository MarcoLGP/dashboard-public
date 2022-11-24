import { Modal, Button, Card } from "@nextui-org/react"

export default function ModalConfirmGeolocation({ visibleModal, setVisibleModal, setSignIn }) {

    return (
        <Modal
            open={visibleModal}
            width={500}
            blur
        >
            <Modal.Header>
                <h1>Geolocalização</h1>
            </Modal.Header>
            <Modal.Body>
                <span className={'font_body_modal'}>Para efetuar o cadastro solicitamos sua geolocalização
                    para complementar seus dados cadastrais e enriquecer a sua experiência e dos outros usuários da comunidade.</span>
            </Modal.Body>
            <Modal.Footer>
                <Card>
                    <Button css={{ '&:hover': { border: '1px solid #FFF' } }} onPress={() => {
                        setVisibleModal(false)
                        setSignIn(false)
                    }}>Prosseguir</Button>
                </Card>
            </Modal.Footer>
        </Modal>
    )

}