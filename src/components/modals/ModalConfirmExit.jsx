import { Modal, Button, Row, Loading } from '@nextui-org/react'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../../redux/slices/userInfo'
import { useState } from 'react'
import { setAutorizate } from '../../../redux/slices/autorizate'
import { setUserNotification } from '../../../redux/slices/userNotifications'

export default function ModalConfirmExit({ setVisibleExitModal, visibleExitModal, push }) {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    function handleExit() {
        setLoading(true)
        push('/')
        localStorage.removeItem('token')
        dispatch(setAutorizate(false))
        dispatch(setUserNotification(false))
        dispatch(setUserInfo(false))
    }

    return (
        <Modal
            open={visibleExitModal}
            onClose={() => setVisibleExitModal(false)}
            blur
        >
            <Modal.Header>
                {loading ? <Loading type='points' /> : <h1 className={'font_title_modals'}>Confirmar logout ?</h1>}
            </Modal.Header>
            {!loading && <Modal.Footer>
                <Row justify='center'>
                    <Button size={'sm'} onClick={() => setVisibleExitModal(false)}>Ficar</Button>
                    <Button size={'sm'} css={{ marginLeft: 10 }} color={'error'} onClick={() => handleExit()}>Sair</Button>
                </Row>
            </Modal.Footer>}
        </Modal>
    )


}