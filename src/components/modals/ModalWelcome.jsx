import { Modal, Card, Button } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { setUserFirstAcess } from '../../../redux/slices/modals'

export default function ModalWelcome({ userFirstAcess, setVisibleModalAvatarPhoto }) {

    const dispatch = useDispatch()

    return (
        <Modal
            open={userFirstAcess}
            width={420}
            onClose={() => dispatch(setUserFirstAcess(false))}
        >
            <Modal.Header>
                <h1>Bem vindo</h1>
            </Modal.Header>
            <Modal.Body>
                <span className={'font_body_modal'}>Que bom que está aqui, este é um projeto sem fins lucrativos, para base de estudo,
                    o repositório do site estará disponível no ícone do github na parte inferior da barra de navegação, que tal após analisar, deixar um feedback na seção dos comentarios ?</span>
            </Modal.Body>
            <Modal.Footer>
                <Card>
                    <Button onClick={() => {
                        dispatch(setUserFirstAcess(false))
                        setVisibleModalAvatarPhoto(true)
                    }}>Ok</Button>
                </Card>
            </Modal.Footer>
        </Modal>
    )

}